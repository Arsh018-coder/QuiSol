const { sequelize } = require('./Models');

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Quisol DB synced with Sequelize!");
});


const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
