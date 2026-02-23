const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Order = require('../models/Order');

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { orderId }
    });

    const payment = new Payment({
      order: orderId,
      user: req.user.id,
      amount,
      paymentMethod: 'card',
      stripePaymentIntentId: paymentIntent.id,
      paymentStatus: 'pending'
    });

    await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const payment = await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentId },
        {
          paymentStatus: 'completed',
          completedAt: new Date(),
          transactionId: paymentIntent.id
        },
        { new: true }
      );

      // Update order payment status
      await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: 'completed' },
        { new: true }
      );

      res.status(200).json({
        message: 'Payment successful',
        payment
      });
    } else {
      res.status(400).json({ message: 'Payment failed', status: paymentIntent.status });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment status
exports.getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Webhook for Stripe
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { paymentStatus: 'completed', completedAt: new Date() }
      );
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({ message: 'Webhook error', error: error.message });
  }
};
