const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    relatedUserId: {
      type: DataTypes.UUID,
      field: 'related_user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    relatedTrackId: {
      type: DataTypes.UUID,
      field: 'related_track_id',
      references: {
        model: 'tracks',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2)
    },
    action: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'activities',
    underscored: true,
    timestamps: true,
    updatedAt: false
  });

  Activity.associate = (models) => {
    Activity.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Activity.belongsTo(models.User, {
      foreignKey: 'relatedUserId',
      as: 'relatedUser'
    });
    Activity.belongsTo(models.Track, {
      foreignKey: 'relatedTrackId',
      as: 'relatedTrack'
    });
  };

  return Activity;
};

