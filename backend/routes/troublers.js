const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getArtists,
  verifyArtist
} = require('../controllers/troublersController');

// All routes require authentication
router.use(authenticateToken);

// The Troublers Integration routes
router.get('/artists', getArtists);
router.post('/verify', verifyArtist);

module.exports = router;
