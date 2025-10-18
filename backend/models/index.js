const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, dbConfig);

const db = {};

// Import models
db.User = require('./User')(sequelize);
db.Track = require('./Track')(sequelize);
db.Collaborator = require('./Collaborator')(sequelize);
db.Stream = require('./Stream')(sequelize);
db.Activity = require('./Activity')(sequelize);
db.Follower = require('./Follower')(sequelize);
db.Transaction = require('./Transaction')(sequelize);

// Define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

