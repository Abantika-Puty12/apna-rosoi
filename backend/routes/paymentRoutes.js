const express = require('express');
const router = express.Router();
const { 
  createPaymentIntent, 
  confirmPayment, 
  getPaymentStatus,
  handleWebhook 
} = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/auth');

router.post('/intent', authMiddleware, createPaymentIntent);
router.post('/confirm', authMiddleware, confirmPayment);
router.get('/:id', authMiddleware, getPaymentStatus);
router.post('/webhook/stripe', handleWebhook);

module.exports = router;
