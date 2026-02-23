const express = require('express');
const router = express.Router();
const { 
  registerRestaurant, 
  getAllRestaurants, 
  getRestaurantById, 
  updateRestaurant, 
  approveRestaurant,
  searchRestaurants,
  getByOwner
} = require('../controllers/restaurantController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, roleMiddleware('restaurant'), registerRestaurant);
router.get('/owner', authMiddleware, getByOwner);
router.get('/', getAllRestaurants);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', authMiddleware, updateRestaurant);
router.put('/:id/approve', authMiddleware, roleMiddleware('admin'), approveRestaurant);

module.exports = router;
