const revenueService = require('../services/revenueService');

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.id;
    const timeRange = req.query.timeRange || '7d';

    const stats = await revenueService.getDashboardStats(userId, timeRange);

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

