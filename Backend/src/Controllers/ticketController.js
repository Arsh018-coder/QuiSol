const { Ticket, Comment, User, Category } = require('../models');
const { sendNotification } = require('../services/notificationService');

// Get all tickets based on user role
const getTickets = async (req, res) => {
  try {
    let tickets;
    
    if (req.user.role === 'admin' || req.user.role === 'agent') {
      // Admin/Agent can see all tickets
      tickets = await Ticket.findAll({
        include: [
          { model: User, attributes: ['username', 'email'] },
          { model: Category, attributes: ['name'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] }
        ],
        order: [['createdAt', 'DESC']]
      });
    } else {
      // Regular users can only see their own tickets
      tickets = await Ticket.findAll({
        where: { user_id: req.user.id },
        include: [
          { model: Category, attributes: ['name'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] }
        ],
        order: [['createdAt', 'DESC']]
      });
    }
    
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Create new ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, category_id, priority } = req.body;
    
    const ticket = await Ticket.create({
      title,
      description,
      category_id,
      priority: priority || 'medium',
      user_id: req.user.id,
      status: 'open'
    });
    
    // Send notification when ticket is created
    await sendNotification({
      recipientId: req.user.id,
      message: '🎫 Your request has been submitted successfully.',
    });
    
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

// Update ticket status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    const oldStatus = ticket.status;
    await ticket.update({ status });
    
    // Send notification when ticket is closed
    if (oldStatus !== 'closed' && status === 'closed') {
      await sendNotification({
        recipientId: ticket.user_id,
        message: `✅ Your request "${ticket.title}" has been completed.`,
      });
    }
    
    res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
};

// Add comment to ticket
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    const comment = await Comment.create({
      content,
      ticket_id: id,
      user_id: req.user.id
    });
    
    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    
    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

module.exports = {
  getTickets,
  createTicket,
  updateStatus,
  addComment
};
