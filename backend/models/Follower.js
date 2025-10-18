const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Follower = sequelize.define('Follower', {
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'follower_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'following_id',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'followers',
    underscored: true,
    timestamps: true,
    updatedAt: false
  });

  return Follower;
};

