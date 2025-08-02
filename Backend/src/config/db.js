const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // set to true to see SQL queries
  }
);

module.exports = sequelize;
