const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stream = sequelize.define('Stream', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trackId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'track_id',
      references: {
        model: 'tracks',
        key: 'id'
      }
    },
    listenerId: {
      type: DataTypes.UUID,
      field: 'listener_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    earningAmount: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0,
      field: 'earning_amount'
    },
    playedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'played_at'
    }
  }, {
    tableName: 'streams',
    underscored: true,
    timestamps: false
  });

  Stream.associate = (models) => {
    Stream.belongsTo(models.Track, {
      foreignKey: 'trackId',
      as: 'track'
    });
    Stream.belongsTo(models.User, {
      foreignKey: 'listenerId',
      as: 'listener'
    });
  };

  return Stream;
};

