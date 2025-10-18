const jwt = require('jsonwebtoken');
const { User } = require('../models');
const hederaService = require('../services/hederaService');

exports.connect = async (req, res, next) => {
  try {
    const { walletAddress, signature, accountId } = req.body;

    if (!walletAddress || !accountId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Wallet address and account ID are required'
        }
      });
    }

    // Verify signature (optional - implement if needed)
    // const isValid = await hederaService.verifySignature(accountId, 'BeatHive Authentication', signature);
    // if (!isValid) {
    //   return res.status(401).json({ success: false, error: { code: 'INVALID_SIGNATURE', message: 'Invalid signature' }});
    // }

    // Check if user exists
    let user = await User.findOne({ where: { walletAddress } });

    if (!user) {
      // Create new user and mint Creator Identity NFT
      const nftMetadata = {
        type: 'Creator Identity',
        platform: 'BeatHive.Africa',
        createdAt: new Date().toISOString()
      };

      let nftId;
      try {
        nftId = await hederaService.mintCreatorNFT(accountId, nftMetadata);
      } catch (nftError) {
        console.warn('⚠️ NFT minting failed, creating user without NFT:', nftError.message);
        nftId = null;
      }

      user = await User.create({
        walletAddress,
        hederaAccountId: accountId,
        nftId,
        name: 'New Creator'
      });

      console.log(`✅ New user created: ${user.id}`);
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        walletAddress: user.walletAddress,
        accountId: user.hederaAccountId
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          accountId: user.hederaAccountId,
          nftId: user.nftId,
          name: user.name,
          avatar: user.avatarUrl,
          verified: user.verified
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          accountId: user.hederaAccountId,
          name: user.name,
          verified: user.verified
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

