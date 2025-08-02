const jwt = require('jsonwebtoken')

/**
 * Generate a JWT token
 * @param {Object} payload - Data to embed in the token (e.g., user ID, email, role)
 * @returns {string} - Signed token
 */
const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not found in environment variables')
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d', // token valid for 24 hours
  })
}

/**
 * Verify a JWT token
 * @param {string} token - The token to verify
 * @returns {Object} - The decoded payload
 * @throws {Error} - If token is invalid or expired
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateToken,
  verifyToken,
}


