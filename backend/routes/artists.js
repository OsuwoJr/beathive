const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const { optionalAuth } = require('../middleware/auth');
const { validate, searchValidation } = require('../middleware/validation');

// GET /api/artists/search - Search artists
router.get('/search', optionalAuth, validate(searchValidation), artistController.searchArtists);

// GET /api/artists/trending - Get trending artists
router.get('/trending', artistController.getTrendingArtists);

// GET /api/artists - Get all artists with filters
router.get('/', optionalAuth, artistController.getAllArtists);

module.exports = router;

