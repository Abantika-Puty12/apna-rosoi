import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/menu/${restaurant._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer">
        <div className="relative h-40 bg-gray-200 overflow-hidden">
          <img
            src={restaurant.image || 'https://via.placeholder.com/300x200?text=Restaurant'}
            alt={restaurant.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Closed</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{restaurant.name}</h3>

          <div className="space-y-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold text-gray-800">{restaurant.rating}</span>
              <span>({restaurant.reviewCount})</span>
            </div>

            {restaurant.cuisine && (
              <p className="text-gray-600">{restaurant.cuisine.join(', ')}</p>
            )}

            <div className="flex items-center gap-2">
              <FaClock className="text-orange-500" />
              <span>{restaurant.deliveryTime} min</span>
            </div>

            {restaurant.address?.city && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>{restaurant.address.city}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t flex justify-between text-sm">
            <span className="text-gray-600">Min: ₹{restaurant.minOrder}</span>
            <span className="text-orange-500 font-semibold">₹{restaurant.deliveryCharge} delivery</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
