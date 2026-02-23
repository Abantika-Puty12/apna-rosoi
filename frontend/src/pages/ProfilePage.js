import React, { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getProfile();
        setProfile(response.data.user);
        setFormData({
          name: response.data.user.name,
          phone: response.data.user.phone,
          address: response.data.user.address || {}
        });
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address_')) {
      const field = name.replace('address_', '');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await userAPI.updateProfile(formData);
      setProfile({ ...profile, ...formData });
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {!editMode ? (
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Name</p>
                <p className="text-lg font-semibold text-gray-800">{profile?.name}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-800">{profile?.email}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">Phone</p>
                <p className="text-lg font-semibold text-gray-800">{profile?.phone}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">Role</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{profile?.role}</p>
              </div>

              {profile?.address?.street && (
                <div>
                  <p className="text-gray-600 text-sm mb-1">Address</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.address.street}, {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                  </p>
                </div>
              )}

              <button
                onClick={() => setEditMode(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Street Address</label>
                <input
                  type="text"
                  name="address_street"
                  value={formData.address?.street || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">City</label>
                  <input
                    type="text"
                    name="address_city"
                    value={formData.address?.city || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">State</label>
                  <input
                    type="text"
                    name="address_state"
                    value={formData.address?.state || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Zip Code</label>
                <input
                  type="text"
                  name="address_zipCode"
                  value={formData.address?.zipCode || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-gray-400"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
