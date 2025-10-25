const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StreetNode = sequelize.define('StreetNode', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nodeId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
      defaultValue: 'active'
    },
    lastPing: {
      type: DataTypes.DATE,
      allowNull: true
    },
    totalUploads: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'street_nodes',
    timestamps: true
  });

  StreetNode.associate = (models) => {
    StreetNode.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner'
    });
  };

  return StreetNode;
};
