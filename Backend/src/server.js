require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

// Load models to ensure associations work
require('./models');

const startServer = async () => {
  try {
    // 🔌 DB connection test
    await sequelize.authenticate();
    console.log('✅ Connected to the Quisol database');

    // 🔄 Sync DB schema
    await sequelize.sync({ alter: true });
    console.log('✅ Quisol DB synced with Sequelize!');

    // 🚀 Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();