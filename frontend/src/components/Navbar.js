import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaUtensils, FaStore } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { totalQuantity } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl">
            <FaUtensils className="text-2xl" />
            <span>Apna Rosoi</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/restaurants" className="text-white hover:text-gray-200 transition">
              Restaurants
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative text-white hover:text-gray-200 transition">
                  <FiShoppingCart className="text-2xl" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {totalQuantity}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="text-white hover:text-gray-200 transition"
                  >
                    <FiUser className="text-2xl" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 first:rounded-t-lg"
                        onClick={() => setProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user?.role === 'restaurant' && (
                        <>
                          <Link
                            to="/restaurant/register"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setProfileOpen(false)}
                          >
                            Register Restaurant
                          </Link>
                          <Link
                            to="/admin/restaurant"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setProfileOpen(false)}
                          >
                            Restaurant Admin
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 last:rounded-b-lg border-t"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-200 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {isAuthenticated && (
              <Link to="/cart" className="relative text-white hover:text-gray-200 transition">
                <FiShoppingCart className="text-2xl" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/restaurants" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
              Restaurants
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
                <Link to="/orders" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
                  My Orders
                </Link>
                {user?.role === 'restaurant' && (
                  <>
                    <Link to="/restaurant/register" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
                      Register Restaurant
                    </Link>
                    <Link to="/admin/restaurant" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
                      Restaurant Admin
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-white hover:text-gray-200 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-gray-200 py-2" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-white hover:text-gray-200 py-2 bg-white text-orange-500 px-4 rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
