const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/activity/:userId - Get user activity
router.get('/:userId', authenticateToken, activityController.getActivity);

module.exports = router;

