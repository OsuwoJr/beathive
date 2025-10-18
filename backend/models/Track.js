const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Track = sequelize.define('Track', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    artistId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'artist_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.TEXT
    },
    audioIpfsHash: {
      type: DataTypes.STRING(100),
      field: 'audio_ipfs_hash'
    },
    coverIpfsHash: {
      type: DataTypes.STRING(100),
      field: 'cover_ipfs_hash'
    },
    nftId: {
      type: DataTypes.STRING(20),
      unique: true,
      field: 'nft_id'
    },
    plays: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    earnings: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    duration: {
      type: DataTypes.INTEGER
    },
    fileSize: {
      type: DataTypes.INTEGER,
      field: 'file_size'
    }
  }, {
    tableName: 'tracks',
    underscored: true,
    timestamps: true
  });

  Track.associate = (models) => {
    Track.belongsTo(models.User, {
      foreignKey: 'artistId',
      as: 'artist'
    });
    Track.hasMany(models.Stream, {
      foreignKey: 'trackId',
      as: 'streams'
    });
    Track.belongsToMany(models.User, {
      through: models.Collaborator,
      foreignKey: 'trackId',
      as: 'collaborators'
    });
  };

  return Track;
};

