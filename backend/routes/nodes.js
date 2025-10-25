const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  registerNode,
  getNodesByCity,
  uploadFromNode
} = require('../controllers/streetNodeController');

// All routes require authentication
router.use(authenticateToken);

// Street Nodes routes
router.post('/register', registerNode);
router.get('/:city', getNodesByCity);
router.post('/upload', uploadFromNode);

module.exports = router;
