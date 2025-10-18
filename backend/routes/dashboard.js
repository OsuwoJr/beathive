const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/dashboard/:userId - Get dashboard stats
router.get('/:userId', authenticateToken, dashboardController.getDashboard);

module.exports = router;

