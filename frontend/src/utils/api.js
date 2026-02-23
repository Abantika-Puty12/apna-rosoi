import apiClient from './apiClient';

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  verifyToken: () => apiClient.get('/auth/verify')
};

// User APIs
export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  getAllUsers: () => apiClient.get('/users')
};

// Restaurant APIs
export const restaurantAPI = {
  register: (data) => apiClient.post('/restaurants', data),
  getAll: () => apiClient.get('/restaurants'),
  getByOwner: () => apiClient.get('/restaurants/owner'),
  getById: (id) => apiClient.get(`/restaurants/${id}`),
  update: (id, data) => apiClient.put(`/restaurants/${id}`, data),
  search: (query) => apiClient.get(`/restaurants/search?q=${query}`)
};

// Menu APIs
export const menuAPI = {
  add: (restaurantId, data) => apiClient.post(`/menu/${restaurantId}`, data),
  getByRestaurant: (restaurantId) => apiClient.get(`/menu/restaurant/${restaurantId}`),
  getById: (id) => apiClient.get(`/menu/${id}`),
  update: (id, data) => apiClient.put(`/menu/${id}`, data),
  delete: (id) => apiClient.delete(`/menu/${id}`),
  search: (query, restaurantId) => apiClient.get(`/menu/search?q=${query}${restaurantId ? `&restaurantId=${restaurantId}` : ''}`)
};

// Cart APIs
export const cartAPI = {
  add: (data) => apiClient.post('/cart', data),
  get: () => apiClient.get('/cart'),
  removeItem: (itemId) => apiClient.delete(`/cart/${itemId}`),
  updateQuantity: (itemId, data) => apiClient.put(`/cart/${itemId}`, data),
  clear: () => apiClient.delete('/cart')
};

// Order APIs
export const orderAPI = {
  create: (data) => apiClient.post('/orders', data),
  getById: (id) => apiClient.get(`/orders/${id}`),
  getMyOrders: () => apiClient.get('/orders'),
  getRestaurantOrders: (restaurantId) => apiClient.get(`/orders/restaurant/${restaurantId}`),
  updateStatus: (id, data) => apiClient.put(`/orders/${id}/status`, data),
  cancel: (id) => apiClient.put(`/orders/${id}/cancel`),
  rate: (id, data) => apiClient.put(`/orders/${id}/rate`, data)
};

// Payment APIs
export const paymentAPI = {
  createIntent: (data) => apiClient.post('/payments/intent', data),
  confirm: (data) => apiClient.post('/payments/confirm', data),
  getStatus: (id) => apiClient.get(`/payments/${id}`)
};

export default {
  authAPI,
  userAPI,
  restaurantAPI,
  menuAPI,
  cartAPI,
  orderAPI,
  paymentAPI
};
