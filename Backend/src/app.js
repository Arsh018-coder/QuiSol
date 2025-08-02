const { sequelize } = require('./models');
const express = require('express')
const cors = require('cors')
const app = express()
const authRoutes = require('./Routes/authRoutes')
const categoryRoutes = require('./Routes/categoryRoutes')
const ticketRoutes = require('./Routes/ticketRoutes')

// Temporarily disable database sync for testing
// sequelize.sync({ alter: true }).then(() => {
//   console.log("✅ Quisol DB synced with Sequelize!");
// });

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'QuiSol Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tickets', ticketRoutes)

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app
