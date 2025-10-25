const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TroublersArtist = sequelize.define('TroublersArtist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    troublersId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    verificationStatus: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending'
    },
    streetPerformanceCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    communityRating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'troublers_artists',
    timestamps: true
  });

  TroublersArtist.associate = (models) => {
    TroublersArtist.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return TroublersArtist;
};
