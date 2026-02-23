const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
      },
      name: String,
      quantity: Number,
      price: Number,
      specialInstructions: String
    }
  ],
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  subtotal: Number,
  tax: Number,
  deliveryCharge: Number,
  discount: Number,
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'cash'],
    default: 'card'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'accepted', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  statusHistory: [
    {
      status: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      notes: String
    }
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  review: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date
});

module.exports = mongoose.model('Order', orderSchema);
