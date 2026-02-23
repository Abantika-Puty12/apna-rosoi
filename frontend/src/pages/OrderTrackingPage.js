import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';
import io from 'socket.io-client';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getById(orderId);
        setOrder(response.data.order);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Real-time updates
    const socket = io('http://localhost:5000');
    socket.emit('joinOrder', orderId);

    socket.on('orderStatusChanged', (data) => {
      if (data.orderId === orderId) {
        setOrder(prev => ({
          ...prev,
          orderStatus: data.status
        }));
      }
    });

    return () => socket.disconnect();
  }, [orderId]);

  const statusSteps = [
    { status: 'placed', label: 'Order Placed' },
    { status: 'accepted', label: 'Accepted' },
    { status: 'preparing', label: 'Preparing' },
    { status: 'ready', label: 'Ready' },
    { status: 'out-for-delivery', label: 'Out for Delivery' },
    { status: 'delivered', label: 'Delivered' }
  ];

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    return statusSteps.findIndex(step => step.status === order.orderStatus);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Tracking</h1>

        {/* Order Number */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-orange-600">{order.orderNumber}</p>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-8">Order Status</h2>

          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${
                      index <= currentStepIndex
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index <= currentStepIndex ? '✓' : index + 1}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`w-1 h-12 transition ${
                        index < currentStepIndex ? 'bg-orange-500' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <p
                    className={`font-semibold text-lg mb-1 ${
                      index <= currentStepIndex ? 'text-orange-600' : 'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </p>
                  {order.statusHistory.find(h => h.status === step.status) && (
                    <p className="text-sm text-gray-500">
                      {new Date(
                        order.statusHistory.find(h => h.status === step.status).timestamp
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Restaurant Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4">Restaurant</h3>
            <p className="font-semibold text-gray-800 mb-2">{order.restaurant?.name}</p>
            <p className="text-sm text-gray-600">{order.restaurant?.address?.street}</p>
            <p className="text-sm text-gray-600">{order.restaurant?.address?.city}</p>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4">Delivery Address</h3>
            <p className="text-sm text-gray-600 mb-1">{order.deliveryAddress?.street}</p>
            <p className="text-sm text-gray-600 mb-1">{order.deliveryAddress?.city}</p>
            <p className="text-sm text-gray-600">{order.deliveryAddress?.state} {order.deliveryAddress?.zipCode}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.items?.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-3 pb-4 border-b">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>₹{order.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>
              <span>₹{order.deliveryCharge?.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 pt-4">
            <span>Total</span>
            <span>₹{order.totalAmount?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
