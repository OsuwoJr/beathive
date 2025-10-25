const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GovernanceToken = sequelize.define('GovernanceToken', {
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
    tokenBalance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stakedBalance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    votingPower: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'governance_tokens',
    timestamps: true
  });

  GovernanceToken.associate = (models) => {
    GovernanceToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return GovernanceToken;
};
