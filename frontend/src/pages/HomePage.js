import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFire } from 'react-icons/fa';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantAPI } from '../utils/api';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await restaurantAPI.getAll();
        setRestaurants(response.data.restaurants || []);
      } catch (error) {
        toast.error('Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Order food from your favorite restaurants</h1>
          <p className="text-xl mb-8">Fast, convenient, and delicious meals delivered to your doorstep</p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Start Ordering <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <FaFire className="text-orange-500 text-2xl" />
          <h2 className="text-3xl font-bold text-gray-800">Popular Restaurants</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map(restaurant => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No restaurants available right now</p>
          </div>
        )}

        {restaurants.length > 6 && (
          <div className="text-center mt-8">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
            >
              View All Restaurants <FaArrowRight />
            </Link>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Browse', desc: 'Select from thousands of restaurants' },
              { step: '2', title: 'Order', desc: 'Add items to cart and checkout' },
              { step: '3', title: 'Track', desc: 'Monitor your order in real-time' },
              { step: '4', title: 'Enjoy', desc: 'Receive and enjoy your meal' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
