const { User, Track, Stream, Transaction, Collaborator, Activity } = require('../models');
const { Op } = require('sequelize');
const hederaService = require('./hederaService');

class RevenueService {
  async recordStream(trackId, listenerId = null) {
    try {
      const track = await Track.findByPk(trackId, {
        include: [{
          model: User,
          as: 'collaborators',
          through: {
            attributes: ['revenueShare']
          }
        }]
      });

      if (!track) {
        throw new Error('Track not found');
      }

      const earningAmount = parseFloat(process.env.STREAM_PAYMENT_AMOUNT) || 0.01;

      // Create stream record
      const stream = await Stream.create({
        trackId,
        listenerId,
        earningAmount,
        playedAt: new Date()
      });

      // Update track plays and earnings
      await track.increment({
        plays: 1,
        earnings: earningAmount
      });

      // Update artist earnings
      await User.increment(
        { totalEarnings: earningAmount, streamCount: 1 },
        { where: { id: track.artistId } }
      );

      // Distribute revenue to collaborators
      if (track.collaborators && track.collaborators.length > 0) {
        await this.distributeToCollaborators(track, earningAmount);
      }

      // Create activity
      await Activity.create({
        userId: track.artistId,
        type: 'stream',
        relatedTrackId: trackId,
        amount: earningAmount,
        action: 'Track was played'
      });

      console.log(`✅ Stream recorded for track ${trackId}`);
      return stream;
    } catch (error) {
      console.error('❌ Error recording stream:', error);
      throw error;
    }
  }

  async distributeToCollaborators(track, totalEarning) {
    try {
      for (const collaborator of track.collaborators) {
        const share = (totalEarning * collaborator.Collaborator.revenueShare) / 100;
        
        if (share > 0) {
          await User.increment(
            { totalEarnings: share },
            { where: { id: collaborator.id } }
          );

          await Activity.create({
            userId: collaborator.id,
            type: 'earning',
            relatedTrackId: track.id,
            amount: share,
            action: 'Collaboration revenue share'
          });
        }
      }
    } catch (error) {
      console.error('❌ Error distributing to collaborators:', error);
      throw error;
    }
  }

  async getDashboardStats(userId, timeRange = '7d') {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      switch (timeRange) {
        case '24h':
          startDate.setHours(now.getHours() - 24);
          break;
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
        default:
          startDate = new Date(0); // All time
      }

      // Get earnings history
      const earningsHistory = await this.getEarningsHistory(userId, startDate);

      // Get recent activity
      const recentActivity = await Activity.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit: 10,
        include: [
          { model: User, as: 'relatedUser', attributes: ['name', 'avatarUrl'] },
          { model: Track, as: 'relatedTrack', attributes: ['title'] }
        ]
      });

      // Get active collaborations count
      const activeCollabs = await Collaborator.count({
        where: { userId }
      });

      return {
        totalEarnings: user.totalEarnings,
        totalStreams: user.streamCount,
        followers: user.followerCount,
        activeCollabs,
        earningsHistory: earningsHistory,
        recentActivity: recentActivity.map(a => ({
          id: a.id,
          type: a.type,
          artist: a.relatedUser?.name,
          track: a.relatedTrack?.title,
          amount: a.amount,
          action: a.action,
          time: this.formatTime(a.createdAt)
        }))
      };
    } catch (error) {
      console.error('❌ Error getting dashboard stats:', error);
      throw error;
    }
  }

  async getEarningsHistory(userId, startDate) {
    try {
      const tracks = await Track.findAll({
        where: { artistId: userId },
        attributes: ['id']
      });

      const trackIds = tracks.map(t => t.id);

      const streams = await Stream.findAll({
        where: {
          trackId: { [Op.in]: trackIds },
          playedAt: { [Op.gte]: startDate }
        },
        attributes: [
          [Track.sequelize.fn('DATE', Track.sequelize.col('played_at')), 'date'],
          [Track.sequelize.fn('SUM', Track.sequelize.col('earning_amount')), 'total']
        ],
        group: ['date'],
        order: [['date', 'ASC']],
        raw: true
      });

      // Format for monthly view
      const monthlyData = {};
      streams.forEach(s => {
        const date = new Date(s.date);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(s.total);
      });

      return Object.entries(monthlyData).map(([month, amount]) => ({
        month,
        amount: parseFloat(amount.toFixed(2))
      }));
    } catch (error) {
      console.error('❌ Error getting earnings history:', error);
      return [];
    }
  }

  async withdrawFunds(userId, amount, destinationAccountId) {
    try {
      const user = await User.findByPk(userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      if (parseFloat(user.totalEarnings) < parseFloat(amount)) {
        throw new Error('Insufficient balance');
      }

      // Create pending transaction
      const transaction = await Transaction.create({
        userId,
        type: 'withdrawal',
        amount,
        status: 'pending',
        description: `Withdrawal to ${destinationAccountId}`
      });

      // Transfer via Hedera
      try {
        const txId = await hederaService.transferHbar(
          process.env.HEDERA_TREASURY_ID,
          destinationAccountId,
          amount
        );

        // Update transaction
        await transaction.update({
          hederaTxId: txId,
          status: 'completed'
        });

        // Update user balance
        await user.decrement('totalEarnings', { by: amount });

        // Create activity
        await Activity.create({
          userId,
          type: 'withdrawal',
          amount,
          action: 'Funds withdrawn'
        });

        return transaction;
      } catch (hederaError) {
        await transaction.update({ status: 'failed' });
        throw hederaError;
      }
    } catch (error) {
      console.error('❌ Error withdrawing funds:', error);
      throw error;
    }
  }

  formatTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}

module.exports = new RevenueService();

