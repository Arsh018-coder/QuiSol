require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./Routes/authRoutes');
const ticketRoutes = require('./Routes/ticketRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const analyticsRoutes = require('./Routes/analyticsRoutes');
const notificationRoutes = require('./Routes/notificationRoutes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 🌐 Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 📦 Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

// ❌ Error handling middleware
app.use(errorHandler);

module.exports = app;