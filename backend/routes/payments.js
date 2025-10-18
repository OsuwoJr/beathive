const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');

// POST /api/payments/withdraw - Withdraw funds
router.post('/withdraw', authenticateToken, paymentController.withdrawFunds);

// GET /api/payments/transactions - Get transaction history
router.get('/transactions', authenticateToken, paymentController.getTransactionHistory);

module.exports = router;

