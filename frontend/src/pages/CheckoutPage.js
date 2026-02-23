import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { orderAPI, paymentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FiMap, FiCreditCard } from 'react-icons/fi';

const CheckoutPage = () => {
  const { items, restaurant, totalPrice } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: { latitude: null, longitude: null }
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const tax = Math.round(totalPrice * 0.05 * 100) / 100;
  const deliveryCharge = restaurant?.deliveryCharge || 0;
  const finalTotal = totalPrice + tax + deliveryCharge;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.street || !deliveryAddress.city) {
      toast.error('Please fill in delivery address');
      return;
    }

    try {
      setLoading(true);

      // Create order
      const orderRes = await orderAPI.create({
        deliveryAddress,
        paymentMethod
      });

      const orderId = orderRes.data.order._id;

      // For card payment, create payment intent
      if (paymentMethod === 'card') {
        const paymentRes = await paymentAPI.createIntent({
          orderId,
          amount: finalTotal
        });

        // TODO: Integrate with Stripe to complete payment
        toast.success('Order placed! Proceed to payment.');
      } else {
        toast.success('Order placed successfully!');
      }

      dispatch(clearCart());
      navigate(`/order/${orderId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiMap /> Delivery Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="street"
                  value={deliveryAddress.street}
                  onChange={handleAddressChange}
                  placeholder="Street address"
                  className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  name="city"
                  value={deliveryAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  name="state"
                  value={deliveryAddress.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  name="zipCode"
                  value={deliveryAddress.zipCode}
                  onChange={handleAddressChange}
                  placeholder="Zip Code"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiCreditCard /> Payment Method
              </h2>

              <div className="space-y-3">
                {['card', 'upi', 'wallet', 'cash'].map(method => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold text-gray-700 capitalize">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="max-h-60 overflow-y-auto mb-4 pb-4 border-b">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
