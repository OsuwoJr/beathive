const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DAOProposal = sequelize.define('DAOProposal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    proposalType: {
      type: DataTypes.ENUM('funding', 'feature', 'governance'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'passed', 'rejected'),
      defaultValue: 'active'
    },
    votesFor: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    votesAgainst: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    votingDeadline: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'dao_proposals',
    timestamps: true
  });

  DAOProposal.associate = (models) => {
    DAOProposal.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    });
    DAOProposal.hasMany(models.DAOVote, {
      foreignKey: 'proposalId',
      as: 'votes'
    });
  };

  return DAOProposal;
};
