const express = require('express');
const router = express.Router();
const { 
  addToCart, 
  getCart, 
  removeFromCart, 
  updateCartQuantity, 
  clearCart 
} = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/:itemId', authMiddleware, removeFromCart);
router.put('/:itemId', authMiddleware, updateCartQuantity);
router.delete('/', authMiddleware, clearCart);

module.exports = router;
