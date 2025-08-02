<<<<<<< HEAD
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    jwtSecret,
    { expiresIn: '1d' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken
};
=======
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
>>>>>>> 1af819a2de9b7e5f02bb85a9bd745f400ad47b99
