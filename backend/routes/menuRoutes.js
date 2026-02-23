const express = require('express');
const router = express.Router();
const { 
  addMenuItem, 
  getMenuByRestaurant, 
  getMenuItemById, 
  updateMenuItem, 
  deleteMenuItem,
  searchMenuItems 
} = require('../controllers/menuController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.post('/:restaurantId', authMiddleware, roleMiddleware('restaurant'), addMenuItem);
router.get('/restaurant/:restaurantId', getMenuByRestaurant);
router.get('/search', searchMenuItems);
router.get('/:id', getMenuItemById);
router.put('/:id', authMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, deleteMenuItem);

module.exports = router;
