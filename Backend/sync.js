const { sequelize } = require('./src/Models');

(async () => {
  try {
    console.log('⏳ Syncing database...');
    
    await sequelize.sync({ alter: true }); 
    // Use { force: true } if you want to drop and recreate all tables (DANGEROUS)

    console.log('✅ Database synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
})();
