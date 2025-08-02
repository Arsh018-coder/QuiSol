const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false, // set to true to see SQL queries
});

module.exports = sequelize;
