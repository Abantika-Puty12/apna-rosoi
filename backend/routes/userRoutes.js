const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers, blockUser, unblockUser } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.put('/:id/block', authMiddleware, roleMiddleware('admin'), blockUser);
router.put('/:id/unblock', authMiddleware, roleMiddleware('admin'), unblockUser);

module.exports = router;
