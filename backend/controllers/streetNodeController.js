const { User, StreetNode } = require('../models');

exports.registerNode = async (req, res, next) => {
  try {
    const { city, country, latitude, longitude } = req.body;
    const ownerId = req.user.id;

    // Generate unique node ID
    const nodeId = `NODE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const node = await StreetNode.create({
      nodeId,
      ownerId,
      city,
      country,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      status: 'active'
    });

    res.json({
      success: true,
      data: { node },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getNodesByCity = async (req, res, next) => {
  try {
    const { city } = req.params;

    const nodes = await StreetNode.findAll({
      where: { city },
      include: [
        { model: User, as: 'owner', attributes: ['id', 'name', 'avatarUrl'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { nodes },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadFromNode = async (req, res, next) => {
  try {
    const { nodeId, trackData } = req.body;

    // Verify node exists and is active
    const node = await StreetNode.findOne({
      where: { nodeId, status: 'active' }
    });

    if (!node) {
      return res.status(404).json({
        success: false,
        error: { code: 'NODE_NOT_FOUND', message: 'Street node not found or inactive' }
      });
    }

    // Update node stats
    node.totalUploads += 1;
    node.lastPing = new Date();
    await node.save();

    res.json({
      success: true,
      data: { 
        message: 'Upload recorded from street node',
        nodeId: node.nodeId,
        totalUploads: node.totalUploads
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
