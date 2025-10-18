const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validate, userIdValidation, updateProfileValidation } = require('../middleware/validation');

// GET /api/users/:id - Get user profile
router.get('/:id', optionalAuth, validate(userIdValidation), userController.getUser);

// PATCH /api/users/:id - Update user profile
router.patch('/:id', authenticateToken, validate([...userIdValidation, ...updateProfileValidation]), userController.updateUser);

// GET /api/users/:id/stats - Get user statistics
router.get('/:id/stats', optionalAuth, validate(userIdValidation), userController.getUserStats);

module.exports = router;

