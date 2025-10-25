const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  createProposal,
  getProposals,
  voteOnProposal,
  getGovernanceTokens
} = require('../controllers/daoController');

// All routes require authentication
router.use(authenticateToken);

// DAO Governance routes
router.post('/proposals', createProposal);
router.get('/proposals', getProposals);
router.post('/vote', voteOnProposal);
router.get('/governance-tokens/:userId', getGovernanceTokens);

module.exports = router;
