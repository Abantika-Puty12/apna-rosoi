import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { items, restaurant, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tax = Math.round(totalPrice * 0.05 * 100) / 100;
  const deliveryCharge = restaurant?.deliveryCharge || 0;
  const finalTotal = totalPrice + tax + deliveryCharge;

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.info('Item removed from cart');
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ itemId, quantity }));
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md">
                {items.map(item => (
                  <div key={item._id} className="p-4 border-b last:border-b-0 flex gap-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/80'}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-orange-600 font-semibold mb-3">₹{item.price}</p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          <FiMinus />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-800 mb-2">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}

                {items.length > 0 && (
                  <div className="p-4 bg-red-50">
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="text-red-600 font-semibold hover:text-red-800 transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                <Link
                  to="/restaurants"
                  className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

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
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
