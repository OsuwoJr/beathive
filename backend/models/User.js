const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    walletAddress: {
      type: DataTypes.STRING(42),
      unique: true,
      allowNull: false,
      field: 'wallet_address'
    },
    hederaAccountId: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      field: 'hedera_account_id'
    },
    nftId: {
      type: DataTypes.STRING(20),
      unique: true,
      field: 'nft_id'
    },
    name: {
      type: DataTypes.STRING(100),
      defaultValue: 'New Creator'
    },
    bio: {
      type: DataTypes.TEXT
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      field: 'avatar_url'
    },
    coverImageUrl: {
      type: DataTypes.TEXT,
      field: 'cover_image_url'
    },
    location: {
      type: DataTypes.STRING(100)
    },
    genre: {
      type: DataTypes.STRING(50)
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'total_earnings'
    },
    followerCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'follower_count'
    },
    streamCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'stream_count'
    },
    collaborationCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'collaboration_count'
    }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.Track, {
      foreignKey: 'artistId',
      as: 'tracks'
    });
    User.hasMany(models.Stream, {
      foreignKey: 'listenerId',
      as: 'streams'
    });
    User.hasMany(models.Activity, {
      foreignKey: 'userId',
      as: 'activities'
    });
    User.belongsToMany(models.Track, {
      through: models.Collaborator,
      foreignKey: 'userId',
      as: 'collaboratedTracks'
    });
    User.belongsToMany(models.User, {
      through: models.Follower,
      foreignKey: 'followerId',
      as: 'following'
    });
    User.belongsToMany(models.User, {
      through: models.Follower,
      foreignKey: 'followingId',
      as: 'followers'
    });
  };

  return User;
};

