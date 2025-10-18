const { User, Track } = require('../models');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Track,
          as: 'tracks',
          attributes: ['id', 'title', 'plays', 'earnings', 'coverIpfsHash', 'createdAt'],
          limit: 10,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        avatar: user.avatarUrl,
        coverImage: user.coverImageUrl,
        location: user.location,
        genre: user.genre,
        verified: user.verified,
        nftId: user.nftId,
        stats: {
          followers: user.followerCount,
          totalEarnings: user.totalEarnings,
          streamsCount: user.streamCount,
          collaborations: user.collaborationCount
        },
        tracks: user.tracks.map(t => ({
          id: t.id,
          title: t.title,
          plays: t.plays,
          earnings: t.earnings,
          coverImage: t.coverIpfsHash,
          createdAt: t.createdAt
        })),
        createdAt: user.createdAt
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'You can only update your own profile' }
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    const { name, bio, location, genre } = req.body;

    await user.update({
      ...(name && { name }),
      ...(bio && { bio }),
      ...(location && { location }),
      ...(genre && { genre })
    });

    res.json({
      success: true,
      data: { user },
      message: 'Profile updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserStats = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['followerCount', 'totalEarnings', 'streamCount', 'collaborationCount']
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    res.json({
      success: true,
      data: {
        followers: user.followerCount,
        totalEarnings: user.totalEarnings,
        totalStreams: user.streamCount,
        collaborations: user.collaborationCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

