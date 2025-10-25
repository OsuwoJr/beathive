const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CopyrightScan = sequelize.define('CopyrightScan', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trackId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tracks',
        key: 'id'
      }
    },
    scanType: {
      type: DataTypes.ENUM('upload', 'periodic', 'manual'),
      allowNull: false
    },
    similarityScore: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    matchedTrackId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'tracks',
        key: 'id'
      }
    },
    violationDetected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    scanResult: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'reported', 'resolved'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'copyright_scans',
    timestamps: true
  });

  CopyrightScan.associate = (models) => {
    CopyrightScan.belongsTo(models.Track, {
      foreignKey: 'trackId',
      as: 'track'
    });
    CopyrightScan.belongsTo(models.Track, {
      foreignKey: 'matchedTrackId',
      as: 'matchedTrack'
    });
  };

  return CopyrightScan;
};
