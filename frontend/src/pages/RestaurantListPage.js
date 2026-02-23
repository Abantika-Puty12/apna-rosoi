import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      try {
        const response = await restaurantAPI.getAll();
        setRestaurants(response.data.restaurants || []);
      } catch (error) {
        toast.error('Failed to load restaurants');
      }
      return;
    }

    try {
      const response = await restaurantAPI.search(value);
      setRestaurants(response.data.restaurants || []);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Restaurants Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No restaurants found</p>
            <Link to="/" className="text-orange-500 font-bold hover:underline">
              Go back home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;
