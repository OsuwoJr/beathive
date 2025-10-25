const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DAOVote = sequelize.define('DAOVote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    proposalId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'dao_proposals',
        key: 'id'
      }
    },
    voterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    voteType: {
      type: DataTypes.ENUM('for', 'against'),
      allowNull: false
    },
    votingPower: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'dao_votes',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['proposalId', 'voterId']
      }
    ]
  });

  DAOVote.associate = (models) => {
    DAOVote.belongsTo(models.DAOProposal, {
      foreignKey: 'proposalId',
      as: 'proposal'
    });
    DAOVote.belongsTo(models.User, {
      foreignKey: 'voterId',
      as: 'voter'
    });
  };

  return DAOVote;
};
