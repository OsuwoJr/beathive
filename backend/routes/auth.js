const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// POST /api/auth/connect - Connect wallet and login/signup
router.post('/connect', authController.connect);

// GET /api/auth/verify - Verify JWT token
router.get('/verify', authenticateToken, authController.verifyToken);

module.exports = router;

