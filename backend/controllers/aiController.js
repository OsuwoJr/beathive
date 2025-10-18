const aiMatchingService = require('../services/aiMatchingService');

exports.getRecommendations = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.id;
    const limit = parseInt(req.query.limit) || 3;

    const recommendations = await aiMatchingService.getRecommendations(userId, limit);

    res.json({
      success: true,
      data: { recommendations },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.suggestCollaborators = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const limit = parseInt(req.query.limit) || 5;

    const collaborators = await aiMatchingService.suggestCollaborators(trackId, limit);

    res.json({
      success: true,
      data: { collaborators },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

