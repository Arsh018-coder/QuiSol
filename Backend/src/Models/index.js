const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Ticket = require('./Ticket')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

// Relationships
User.hasMany(Ticket, { foreignKey: 'user_id' });
Ticket.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Ticket, { foreignKey: 'category_id' });
Ticket.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Ticket.hasMany(Comment, { foreignKey: 'ticket_id' });
Comment.belongsTo(Ticket, { foreignKey: 'ticket_id' });

module.exports = {
  sequelize,
  User,
  Category,
  Ticket,
  Comment,
};