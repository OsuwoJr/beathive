const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...\n');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established\n');

    // Read SQL file
    const sqlFile = path.join(__dirname, 'createTables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Execute SQL
    await sequelize.query(sql);
    console.log('✅ Tables created successfully\n');

    // Optionally run seed data (only in development)
    if (process.env.NODE_ENV === 'development' && process.argv.includes('--seed')) {
      console.log('🌱 Seeding database with sample data...\n');
      const seedFile = path.join(__dirname, 'seedData.sql');
      const seedSql = fs.readFileSync(seedFile, 'utf8');
      await sequelize.query(seedSql);
      console.log('✅ Sample data seeded successfully\n');
    }

    console.log('✅ All migrations completed!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();

