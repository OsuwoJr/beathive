const { Track, User, Collaborator } = require('../models');
const ipfsService = require('../services/ipfsService');
const hederaService = require('../services/hederaService');
const revenueService = require('../services/revenueService');

exports.uploadTrack = async (req, res, next) => {
  try {
    const { title, genre, description, collaborators, tags } = req.body;
    const audioFile = req.files?.audioFile?.[0];
    const coverImage = req.files?.coverImage?.[0];

    if (!audioFile || !coverImage) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FILES', message: 'Audio file and cover image are required' }
      });
    }

    // Upload files to IPFS
    const audioHash = await ipfsService.uploadFile(audioFile.buffer, audioFile.originalname);
    const coverHash = await ipfsService.uploadFile(coverImage.buffer, coverImage.originalname);

    // Create track metadata
    const trackMetadata = {
      title,
      genre,
      artist: req.user.hederaAccountId,
      audioHash,
      coverHash,
      createdAt: new Date().toISOString()
    };

    // Mint Track NFT
    let nftId;
    try {
      nftId = await hederaService.mintTrackNFT(req.user.hederaAccountId, trackMetadata);
    } catch (nftError) {
      console.warn('⚠️ NFT minting failed, creating track without NFT:', nftError.message);
      nftId = null;
    }

    // Create track in database
    const track = await Track.create({
      artistId: req.user.id,
      title,
      genre,
      description,
      audioIpfsHash: audioHash,
      coverIpfsHash: coverHash,
      nftId,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      fileSize: audioFile.size
    });

    // Add collaborators if provided
    if (collaborators && Array.isArray(collaborators)) {
      for (const collab of collaborators) {
        const collabUser = await User.findOne({ where: { hederaAccountId: collab.accountId } });
        if (collabUser) {
          await Collaborator.create({
            trackId: track.id,
            userId: collabUser.id,
            revenueShare: collab.share || 0
          });
        }
      }
    }

    res.status(201).json({
      success: true,
      data: {
        trackId: track.id,
        nftId: track.nftId,
        ipfsHash: audioHash,
        status: 'uploaded'
      },
      message: 'Track uploaded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrack = async (req, res, next) => {
  try {
    const track = await Track.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'name', 'avatarUrl', 'verified']
        },
        {
          model: User,
          as: 'collaborators',
          attributes: ['id', 'name', 'avatarUrl'],
          through: { attributes: ['revenueShare'] }
        }
      ]
    });

    if (!track) {
      return res.status(404).json({
        success: false,
        error: { code: 'TRACK_NOT_FOUND', message: 'Track not found' }
      });
    }

    res.json({
      success: true,
      data: {
        id: track.id,
        title: track.title,
        artist: track.artist,
        genre: track.genre,
        description: track.description,
        audioUrl: ipfsService.getGatewayUrl(track.audioIpfsHash),
        coverImageUrl: ipfsService.getGatewayUrl(track.coverIpfsHash),
        nftId: track.nftId,
        plays: track.plays,
        earnings: track.earnings,
        collaborators: track.collaborators,
        tags: track.tags,
        createdAt: track.createdAt
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.playTrack = async (req, res, next) => {
  try {
    const listenerId = req.user?.id || null;
    const stream = await revenueService.recordStream(req.params.id, listenerId);

    res.json({
      success: true,
      data: {
        playId: stream.id,
        earningAdded: stream.earningAmount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserTracks = async (req, res, next) => {
  try {
    const tracks = await Track.findAll({
      where: { artistId: req.params.userId },
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['name', 'avatarUrl']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { tracks },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

