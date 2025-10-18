const { User, Track, Collaborator } = require('../models');
const { Op } = require('sequelize');

class AIMatchingService {
  async getRecommendations(userId, limit = 3) {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Track,
            as: 'tracks',
            attributes: ['genre']
          },
          {
            model: User,
            as: 'following',
            attributes: ['id']
          }
        ]
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Get all other users
      const allUsers = await User.findAll({
        where: {
          id: { [Op.ne]: userId }
        },
        include: [
          {
            model: Track,
            as: 'tracks',
            attributes: ['genre']
          }
        ]
      });

      // Calculate compatibility for each user
      const scoredUsers = allUsers.map(otherUser => {
        const compatibility = this.calculateCompatibility(user, otherUser);
        const reason = this.generateReason(user, otherUser, compatibility);

        return {
          artist: {
            id: otherUser.id,
            name: otherUser.name,
            genre: otherUser.genre,
            location: otherUser.location,
            avatar: otherUser.avatarUrl,
            verified: otherUser.verified,
            followers: otherUser.followerCount
          },
          compatibility: Math.round(compatibility),
          reason,
          potentialCollaborators: this.findCommonCollaborators(user.id, otherUser.id)
        };
      });

      // Sort by compatibility and return top matches
      const recommendations = scoredUsers
        .sort((a, b) => b.compatibility - a.compatibility)
        .slice(0, limit);

      return recommendations;
    } catch (error) {
      console.error('❌ Error generating recommendations:', error);
      throw error;
    }
  }

  calculateCompatibility(user1, user2) {
    let score = 0;

    // Genre match (40%)
    if (user1.genre === user2.genre) {
      score += 40;
    } else if (this.areRelatedGenres(user1.genre, user2.genre)) {
      score += 20;
    }

    // Location proximity (30%)
    if (user1.location && user2.location) {
      const loc1Parts = user1.location.split(',');
      const loc2Parts = user2.location.split(',');
      
      // Same city
      if (loc1Parts[0]?.trim() === loc2Parts[0]?.trim()) {
        score += 30;
      }
      // Same country
      else if (loc1Parts[loc1Parts.length - 1]?.trim() === loc2Parts[loc2Parts.length - 1]?.trim()) {
        score += 15;
      }
    }

    // Similar follower count (20%)
    if (user1.followerCount && user2.followerCount) {
      const ratio = Math.min(user1.followerCount, user2.followerCount) / 
                    Math.max(user1.followerCount, user2.followerCount);
      score += ratio * 20;
    }

    // Track count similarity (10%)
    const user1TrackCount = user1.tracks?.length || 0;
    const user2TrackCount = user2.tracks?.length || 0;
    if (user1TrackCount > 0 && user2TrackCount > 0) {
      const trackRatio = Math.min(user1TrackCount, user2TrackCount) / 
                         Math.max(user1TrackCount, user2TrackCount);
      score += trackRatio * 10;
    }

    return Math.min(score, 100);
  }

  areRelatedGenres(genre1, genre2) {
    const relatedGenres = {
      'Afrobeats': ['Afro Pop', 'Afro Soul'],
      'Afro Soul': ['Afrobeats', 'Afro Jazz'],
      'Afro Jazz': ['Afro Soul', 'Traditional/Fusion'],
      'Genge/Hip-Hop': ['Afro Pop', 'Afrobeats'],
      'Traditional/Fusion': ['Afro Jazz', 'Afrobeats'],
      'Afro Pop': ['Afrobeats', 'Genge/Hip-Hop']
    };

    return relatedGenres[genre1]?.includes(genre2) || false;
  }

  generateReason(user1, user2, compatibility) {
    if (user1.genre === user2.genre) {
      return 'Your styles match perfectly';
    }

    if (user1.location && user2.location) {
      const loc1City = user1.location.split(',')[0]?.trim();
      const loc2City = user2.location.split(',')[0]?.trim();
      if (loc1City === loc2City) {
        return `Both based in ${loc1City}`;
      }
    }

    if (this.areRelatedGenres(user1.genre, user2.genre)) {
      return 'Complementary music styles';
    }

    if (compatibility > 70) {
      return 'High potential for collaboration';
    }

    return 'Similar fan base and reach';
  }

  async findCommonCollaborators(userId1, userId2) {
    try {
      // Find tracks both users have collaborated on
      const user1Collabs = await Collaborator.findAll({
        where: { userId: userId1 },
        attributes: ['trackId']
      });

      const user2Collabs = await Collaborator.findAll({
        where: { userId: userId2 },
        attributes: ['trackId']
      });

      const commonTrackIds = user1Collabs
        .map(c => c.trackId)
        .filter(id => user2Collabs.some(c => c.trackId === id));

      if (commonTrackIds.length > 0) {
        const commonTracks = await Track.findAll({
          where: { id: { [Op.in]: commonTrackIds } },
          include: [{
            model: User,
            as: 'artist',
            attributes: ['name']
          }]
        });

        return commonTracks.map(t => t.artist.name);
      }

      return [];
    } catch (error) {
      console.error('❌ Error finding common collaborators:', error);
      return [];
    }
  }

  async suggestCollaborators(trackId, limit = 5) {
    try {
      const track = await Track.findByPk(trackId, {
        include: [{
          model: User,
          as: 'artist'
        }]
      });

      if (!track) {
        throw new Error('Track not found');
      }

      // Find artists with similar genre
      const similarArtists = await User.findAll({
        where: {
          id: { [Op.ne]: track.artistId },
          genre: track.genre
        },
        limit
      });

      return similarArtists;
    } catch (error) {
      console.error('❌ Error suggesting collaborators:', error);
      throw error;
    }
  }
}

module.exports = new AIMatchingService();

