const { Activity, User, Track } = require('../models');

exports.getActivity = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    const activities = await Activity.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'relatedUser',
          attributes: ['name', 'avatarUrl']
        },
        {
          model: Track,
          as: 'relatedTrack',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit
    });

    const formattedActivities = activities.map(a => ({
      id: a.id,
      type: a.type,
      artist: a.relatedUser?.name,
      track: a.relatedTrack?.title,
      amount: a.amount,
      action: a.action,
      timestamp: a.createdAt
    }));

    res.json({
      success: true,
      data: { activities: formattedActivities },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

