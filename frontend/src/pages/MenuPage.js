import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import { restaurantAPI, menuAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FaStar, FaClock } from 'react-icons/fa';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [restaurantRes, menuRes] = await Promise.all([
          restaurantAPI.getById(restaurantId),
          menuAPI.getByRestaurant(restaurantId)
        ]);

        setRestaurant(restaurantRes.data.restaurant);
        setMenuItems(menuRes.data.menuItems || []);
      } catch (error) {
        toast.error('Failed to load menu');
        navigate('/restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId, navigate]);

  const categories = ['all', 'appetizer', 'main-course', 'dessert', 'beverage', 'bread', 'rice'];

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-md mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 mb-6">
            <img
              src={restaurant.image || 'https://via.placeholder.com/200'}
              alt={restaurant.name}
              className="w-32 h-32 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>

              <div className="flex gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-gray-600">({restaurant.reviewCount})</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaClock className="text-orange-500" />
                  <span>{restaurant.deliveryTime} min</span>
                </div>
              </div>

              {restaurant.cuisine && (
                <p className="text-gray-600">{restaurant.cuisine.join(', ')}</p>
              )}
            </div>
          </div>

          {restaurant.description && (
            <p className="text-gray-600 mb-4">{restaurant.description}</p>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 pb-8">
        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map(item => (
              <MenuItem
                key={item._id}
                item={item}
                restaurant={restaurant}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No items in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
