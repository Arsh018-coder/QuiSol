const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    // Check if user exists
    const existing = await User.findOne({ where: { email } })
    if (existing) return res.status(409).json({ message: 'Email already registered'})
    // Hash password
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hash, role: role || 'user' })
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Registration failed', error: err.message })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' })
    // Issue JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
}

const { verifyToken } = require('../utils/tokenUtils')
