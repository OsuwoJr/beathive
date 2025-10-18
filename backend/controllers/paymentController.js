const revenueService = require('../services/revenueService');

exports.withdrawFunds = async (req, res, next) => {
  try {
    const { amount, destination } = req.body;

    if (!amount || !destination) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Amount and destination are required'
        }
      });
    }

    if (parseFloat(amount) <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_AMOUNT',
          message: 'Amount must be greater than 0'
        }
      });
    }

    const transaction = await revenueService.withdrawFunds(
      req.user.id,
      parseFloat(amount),
      destination
    );

    res.json({
      success: true,
      data: {
        transactionId: transaction.hederaTxId,
        status: transaction.status,
        amount: transaction.amount
      },
      message: 'Withdrawal initiated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    if (error.message === 'Insufficient balance') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_BALANCE',
          message: 'You do not have enough funds to withdraw'
        }
      });
    }
    next(error);
  }
};

exports.getTransactionHistory = async (req, res, next) => {
  try {
    const { Transaction } = require('../models');
    
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit) || 20
    });

    res.json({
      success: true,
      data: { transactions },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

