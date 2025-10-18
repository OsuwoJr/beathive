const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// GET /api/ai/recommendations/:userId - Get AI recommendations for user
router.get('/recommendations/:userId', optionalAuth, aiController.getRecommendations);

// GET /api/ai/collaborators/:trackId - Suggest collaborators for track
router.get('/collaborators/:trackId', authenticateToken, aiController.suggestCollaborators);

module.exports = router;

