const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const {
  scanContent,
  getViolations,
  reportViolation
} = require('../controllers/copyrightController');

// All routes require authentication
router.use(authenticateToken);

// Copyright Protection routes
router.post('/scan', upload.single('audioFile'), scanContent);
router.get('/violations/:userId', getViolations);
router.post('/report', reportViolation);

module.exports = router;
