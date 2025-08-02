const { Ticket, User, Category, Comment } = require('../models')

// List all tickets (filtered by user or agent)
exports.getTickets = async (req, res) => {
  try {
    const { role, id } = req.user // from auth middleware
    let where = {}
    if (role === 'user') where.userId = id
    if (role === 'agent') where.agentId = id

    const tickets = await Ticket.findAll({
      where,
      include: [
        { model: Category, attributes: ['name'] },
        { model: User, as: 'user', attributes: ['name'] },
        { model: User, as: 'agent', attributes: ['name'] }
      ],
      order: [['updatedAt', 'DESC']]
    })
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ message: 'Ticket fetch failed', error: err.message })
  }
}

// Create new ticket
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, categoryId, priority } = req.body
    const ticket = await Ticket.create({
      subject, description, categoryId, priority,
      status: 'Open', userId: req.user.id
    })
    res.status(201).json(ticket)
  } catch (err) {
    res.status(500).json({ message: 'Ticket creation failed', error: err.message })
  }
}

// Update ticket status (agent/admin)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const ticket = await Ticket.findByPk(id)
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
    ticket.status = status
    await ticket.save()
    res.json(ticket)
  } catch (err) {
    res.status(500).json({ message: 'Ticket status update failed', error: err.message })
  }
}

// Add a comment to a ticket (threaded conversations)
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params // ticket ID
    const { message } = req.body
    const comment = await Comment.create({
      ticketId: id,
      userId: req.user.id,
      message,
      senderRole: req.user.role
    })
    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json({ message: 'Add comment failed', error: err.message })
  }
}
