const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Collaborator = sequelize.define('Collaborator', {
    trackId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'track_id',
      references: {
        model: 'tracks',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    revenueShare: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      field: 'revenue_share'
    }
  }, {
    tableName: 'track_collaborators',
    underscored: true,
    timestamps: true
  });

  return Collaborator;
};

