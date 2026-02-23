import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getMyOrders();
        setOrders(response.data.orders || []);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRate = async (orderId) => {
    try {
      await orderAPI.rate(orderId, { rating, review });
      setOrders(prev => prev.map(order => 
        order._id === orderId 
          ? { ...order, rating, review }
          : order
      ));
      setRatingOrder(null);
      toast.success('Rating submitted successfully');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'placed': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-yellow-100 text-yellow-800',
      'preparing': 'bg-orange-100 text-orange-800',
      'ready': 'bg-orange-100 text-orange-800',
      'out-for-delivery': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{order.restaurant?.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg font-semibold capitalize ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.replace('-', ' ')}
                  </span>
                </div>

                <div className="border-t pt-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Items:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {order.items?.map((item, index) => (
                      <li key={index}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 mb-4 flex justify-between items-center">
                  <p className="font-bold text-lg text-gray-800">₹{order.totalAmount?.toFixed(2)}</p>
                  <Link
                    to={`/order/${order._id}`}
                    className="text-orange-500 font-semibold hover:underline"
                  >
                    Track Order
                  </Link>
                </div>

                {order.orderStatus === 'delivered' && !order.rating && (
                  <button
                    onClick={() => setRatingOrder(order._id)}
                    className="w-full bg-orange-50 text-orange-600 py-2 rounded-lg font-semibold hover:bg-orange-100 transition"
                  >
                    Rate This Order
                  </button>
                )}

                {order.rating && (
                  <div className="bg-green-50 p-3 rounded-lg mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold text-green-700">{order.rating}/5</span>
                    </div>
                    {order.review && <p className="text-sm text-gray-700">{order.review}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No orders yet</p>
            <Link
              to="/restaurants"
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Start Ordering
            </Link>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Rate Your Order</h2>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Review (Optional)</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your feedback..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleRate(ratingOrder)}
                className="flex-1 bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setRatingOrder(null)}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
