const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')

// ✅ Register
router.post('/register', authController.register)

// ✅ Login
router.post('/login', authController.login)

module.exports = router
