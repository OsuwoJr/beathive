const { User, Track } = require('../models');
const { Op } = require('sequelize');

exports.searchArtists = async (req, res, next) => {
  try {
    const { q, genre, location, limit = 20, page = 1 } = req.query;

    const where = {};
    
    if (q) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } },
        { location: { [Op.iLike]: `%${q}%` } },
        { genre: { [Op.iLike]: `%${q}%` } }
      ];
    }

    if (genre && genre !== 'all') {
      where.genre = genre;
    }

    if (location) {
      where.location = { [Op.iLike]: `%${location}%` };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where,
      include: [
        {
          model: Track,
          as: 'tracks',
          attributes: ['id'],
          separate: true
        }
      ],
      limit: parseInt(limit),
      offset,
      order: [['followerCount', 'DESC']]
    });

    const results = rows.map(user => ({
      id: user.id,
      name: user.name,
      location: user.location,
      genre: user.genre,
      followers: user.followerCount,
      verified: user.verified,
      avatar: user.avatarUrl,
      coverImage: user.coverImageUrl,
      bio: user.bio,
      totalEarnings: user.totalEarnings,
      streamsCount: user.streamCount,
      collaborations: user.collaborationCount,
      nftId: user.nftId,
      tracksCount: user.tracks.length
    }));

    res.json({
      success: true,
      data: {
        results,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllArtists = async (req, res, next) => {
  try {
    const { genre, sort = 'popularity', limit = 20, page = 1 } = req.query;

    const where = {};
    if (genre && genre !== 'all') {
      where.genre = genre;
    }

    let order;
    switch (sort) {
      case 'popularity':
        order = [['followerCount', 'DESC']];
        break;
      case 'recent':
        order = [['createdAt', 'DESC']];
        break;
      case 'earnings':
        order = [['totalEarnings', 'DESC']];
        break;
      default:
        order = [['followerCount', 'DESC']];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order
    });

    res.json({
      success: true,
      data: {
        artists: rows.map(user => ({
          id: user.id,
          name: user.name,
          location: user.location,
          genre: user.genre,
          followers: user.followerCount,
          verified: user.verified,
          avatar: user.avatarUrl,
          coverImage: user.coverImageUrl,
          bio: user.bio
        })),
        total: count,
        page: parseInt(page),
        limit: parseInt(limit)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrendingArtists = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const artists = await User.findAll({
      order: [['streamCount', 'DESC']],
      limit
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

