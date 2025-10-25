const { Track, CopyrightScan } = require('../models');

exports.scanContent = async (req, res, next) => {
  try {
    const { trackId } = req.body;
    const audioFile = req.files?.audioFile?.[0];

    if (!audioFile) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FILE', message: 'Audio file is required' }
      });
    }

    // Simulate AI copyright scanning
    const similarityScore = Math.random() * 100;
    const violationDetected = similarityScore > 80;
    const matchedTrackId = violationDetected ? `TRACK_${Math.random().toString(36).substr(2, 9)}` : null;

    const scanResult = {
      similarityScore: Math.round(similarityScore * 100) / 100,
      violationDetected,
      matchedTrackId,
      scanType: 'upload',
      audioFeatures: {
        tempo: Math.floor(Math.random() * 200) + 60,
        key: Math.floor(Math.random() * 12),
        energy: Math.random(),
        valence: Math.random()
      }
    };

    // Save scan result
    const scan = await CopyrightScan.create({
      trackId,
      scanType: 'upload',
      similarityScore: scanResult.similarityScore,
      matchedTrackId: scanResult.matchedTrackId,
      violationDetected: scanResult.violationDetected,
      scanResult: JSON.stringify(scanResult)
    });

    res.json({
      success: true,
      data: { 
        scanResult,
        scanId: scan.id
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getViolations = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Get user's tracks
    const userTracks = await Track.findAll({
      where: { artistId: userId },
      attributes: ['id']
    });

    const trackIds = userTracks.map(track => track.id);

    const violations = await CopyrightScan.findAll({
      where: { trackId: trackIds },
      include: [
        { model: Track, as: 'track', attributes: ['id', 'title', 'artistId'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { violations },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.reportViolation = async (req, res, next) => {
  try {
    const { violationId } = req.body;

    const violation = await CopyrightScan.findByPk(violationId);
    if (!violation) {
      return res.status(404).json({
        success: false,
        error: { code: 'VIOLATION_NOT_FOUND', message: 'Copyright violation not found' }
      });
    }

    // Update violation status
    violation.status = 'reported';
    await violation.save();

    res.json({
      success: true,
      data: { message: 'Copyright violation reported successfully' },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
