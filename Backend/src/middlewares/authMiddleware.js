const jwt = require('jsonwebtoken');
require('dotenv').config();
const { verifyToken } = require('../utils/tokenUtils')
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    req.user = decoded  // Attach user info to request
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message })
  }
}

module.exports = authMiddleware
