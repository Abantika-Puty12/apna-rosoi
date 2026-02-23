const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  getUserOrders, 
  getRestaurantOrders, 
  updateOrderStatus, 
  cancelOrder, 
  rateOrder,
  getAllOrders 
} = require('../controllers/orderController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/admin/all', authMiddleware, roleMiddleware('admin'), getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.get('/restaurant/:restaurantId', authMiddleware, getRestaurantOrders);
router.put('/:id/status', authMiddleware, updateOrderStatus);
router.put('/:id/cancel', authMiddleware, cancelOrder);
router.put('/:id/rate', authMiddleware, rateOrder);

module.exports = router;
