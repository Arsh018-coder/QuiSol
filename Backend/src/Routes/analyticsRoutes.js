const express = require('express');
const router = express.Router();
const { sequelize, User, Ticket, Category } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

// Get dashboard analytics (requires authentication)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalTickets = await Ticket.count();
    const openTickets = await Ticket.count({ where: { status: 'open' } });
    const inProgressTickets = await Ticket.count({ where: { status: 'in_progress' } });
    const closedTickets = await Ticket.count({ where: { status: 'closed' } });
    const totalCategories = await Category.count();

    // Recent tickets
    const recentTickets = await Ticket.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      include: [{ model: User, attributes: ['username'] }, { model: Category, attributes: ['name'] }]
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTickets,
        openTickets,
        inProgressTickets,
        closedTickets,
        totalCategories,
        recentTickets
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get ticket statistics by status
router.get('/tickets/status', authMiddleware, async (req, res) => {
  try {
    const statusStats = await Ticket.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('status')), 'count']
      ],
      group: ['status']
    });

    res.json({
      success: true,
      data: statusStats
    });
  } catch (error) {
    console.error('Status analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
