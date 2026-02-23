import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI, restaurantAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const RestaurantAdminPage = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main-course',
    isVegetarian: false,
    isSpicy: false,
    preparationTime: 15,
    image: ''
  });

  const categories = ['appetizer', 'main-course', 'dessert', 'beverage', 'bread', 'rice'];

  // Fetch restaurant data and menu items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login as restaurant owner');
          navigate('/login');
          return;
        }

        setLoading(true);

        // Get current user's restaurant
        const restaurantRes = await restaurantAPI.getByOwner();
        if (restaurantRes.data.restaurant) {
          setRestaurant(restaurantRes.data.restaurant);

          // Fetch menu items
          const menuRes = await menuAPI.getByRestaurant(restaurantRes.data.restaurant._id);
          setMenuItems(menuRes.data.menuItems || []);
        } else {
          toast.error('No restaurant found. Please register your restaurant first.');
        }
      } catch (error) {
        console.error(error);
        if (error.response?.status === 404) {
          toast.error('No restaurant found. Please register your restaurant first.');
        } else {
          toast.error('Failed to load restaurant data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'preparationTime' ? parseFloat(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      if (!formData.name || !formData.price) {
        toast.error('Please fill in all required fields');
        return;
      }

      setLoading(true);

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        preparationTime: parseInt(formData.preparationTime, 10)
      };

      if (editingId) {
        // Update existing menu item
        const res = await fetch(`http://localhost:5000/api/menu/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Failed to update menu item');
        const data = await res.json();

        setMenuItems(prev => prev.map(item => item._id === editingId ? data.menuItem : item));
        toast.success('Menu item updated successfully!');
      } else {
        // Add new menu item
        if (!restaurant) {
          toast.error('Restaurant not found');
          return;
        }

        const res = await fetch(`http://localhost:5000/api/menu/${restaurant._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Failed to add menu item');
        const data = await res.json();

        setMenuItems(prev => [...prev, data.menuItem]);
        toast.success('Menu item added successfully!');
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'main-course',
        isVegetarian: false,
        isSpicy: false,
        preparationTime: 15,
        image: ''
      });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      isVegetarian: item.isVegetarian,
      isSpicy: item.isSpicy,
      preparationTime: item.preparationTime,
      image: item.image
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/menu/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete');
      setMenuItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Menu item deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete menu item');
    }
  };

  if (loading && !restaurant) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-lg">No restaurant found. Please register as a restaurant owner.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600">{restaurant.description}</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            <FaPlus /> Add Menu Item
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Margherita Pizza"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 9.99"
                  step="0.01"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preparation Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prep Time (min)</label>
                <input
                  type="number"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your item..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-semibold text-gray-700">Vegetarian</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isSpicy"
                    checked={formData.isSpicy}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-semibold text-gray-700">Spicy</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
                >
                  {editingId ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: 'main-course',
                      isVegetarian: false,
                      isSpicy: false,
                      preparationTime: 15,
                      image: ''
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menu Items List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu Items ({menuItems.length})</h2>

          {menuItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Price</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Veg</th>
                    <th className="pb-3 font-semibold">Spicy</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">${item.price}</td>
                      <td className="py-3 capitalize">{item.category}</td>
                      <td className="py-3">{item.isVegetarian ? '✓' : '✗'}</td>
                      <td className="py-3">{item.isSpicy ? '✓' : '✗'}</td>
                      <td className="py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No menu items yet. Add your first item!</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 flex items-center justify-center gap-2 mx-auto bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              >
                <FaPlus /> Add Menu Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantAdminPage;
