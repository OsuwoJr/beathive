const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate, trackIdValidation, uploadTrackValidation } = require('../middleware/validation');

// POST /api/tracks/upload - Upload new track
router.post('/upload', 
  authenticateToken,
  upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  validate(uploadTrackValidation),
  trackController.uploadTrack
);

// GET /api/tracks/:id - Get track details
router.get('/:id', optionalAuth, validate(trackIdValidation), trackController.getTrack);

// POST /api/tracks/:id/play - Record a play/stream
router.post('/:id/play', optionalAuth, validate(trackIdValidation), trackController.playTrack);

// GET /api/tracks/user/:userId - Get all tracks by user
router.get('/user/:userId', trackController.getUserTracks);

module.exports = router;

