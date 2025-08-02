const express = require('express')
const router = express.Router()
const ticketController = require('../Controllers/ticketController')
const auth = require('../middlewares/authMiddleware')

// ✅ Get tickets based on user or agent role
router.get('/', auth, ticketController.getTickets)

// ✅ Create new ticket
router.post('/', auth, ticketController.createTicket)

// ✅ Update ticket status (agent/admin)
router.put('/:id/status', auth, ticketController.updateStatus)

// ✅ Add comment to ticket
router.post('/:id/comment', auth, ticketController.addComment)

module.exports = router
