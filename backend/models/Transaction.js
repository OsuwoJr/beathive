const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    hederaTxId: {
      type: DataTypes.STRING(50),
      field: 'hedera_tx_id'
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending'
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'transactions',
    underscored: true,
    timestamps: true,
    updatedAt: false
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Transaction;
};

