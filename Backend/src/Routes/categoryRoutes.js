const express = require('express')
const router = express.Router()
const categoryController = require('../Controllers/categoryController')
const auth = require('../middlewares/authMiddleware')
// Optional: if you create a role-based guard (e.g., adminOnly), import that too

// ✅ Get all categories (public or auth protected)
router.get('/', categoryController.getAllCategories)

// ✅ Create new category (Admin only)
router.post('/', auth, categoryController.createCategory)

// ✅ Update existing category
router.put('/:id', auth, categoryController.updateCategory)

// ✅ Delete a category
router.delete('/:id', auth, categoryController.deleteCategory)

module.exports = router
