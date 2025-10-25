const { User, TroublersArtist } = require('../models');

exports.getArtists = async (req, res, next) => {
  try {
    const { status = 'verified' } = req.query;

    const artists = await TroublersArtist.findAll({
      where: { verificationStatus: status },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'avatarUrl', 'location', 'genre'] }
      ],
      order: [['communityRating', 'DESC']]
    });

    res.json({
      success: true,
      data: { artists },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyArtist = async (req, res, next) => {
  try {
    const { troublersId, streetPerformanceCount, communityRating } = req.body;
    const userId = req.user.id;

    // Check if user already has verification
    let verification = await TroublersArtist.findOne({
      where: { userId }
    });

    if (verification) {
      return res.status(400).json({
        success: false,
        error: { code: 'ALREADY_VERIFIED', message: 'User already has verification request' }
      });
    }

    // Create verification request
    verification = await TroublersArtist.create({
      userId,
      troublersId,
      streetPerformanceCount: parseInt(streetPerformanceCount),
      communityRating: parseFloat(communityRating),
      verificationStatus: 'pending'
    });

    res.json({
      success: true,
      data: { 
        verification,
        message: 'Verification request submitted successfully'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
