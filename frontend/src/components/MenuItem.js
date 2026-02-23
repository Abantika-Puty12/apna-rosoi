import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FiPlus } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MenuItem = ({ item, restaurant }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      menuItem: item,
      quantity: 1,
      restaurant: restaurant
    }));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={item.image || 'https://via.placeholder.com/100?text=Food'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.name}</h3>
              {item.isVegetarian && (
                <div className="flex items-center gap-1 mb-2">
                  <FaLeaf className="text-green-500 text-sm" />
                  <span className="text-xs text-green-600 font-semibold">Vegetarian</span>
                </div>
              )}
            </div>
            <span className="text-orange-600 font-bold text-lg">₹{item.price}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{item.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {item.preparationTime} min prep
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
            >
              <FiPlus /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
