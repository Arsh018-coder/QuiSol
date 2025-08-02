const { Category } = require('../models')

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch categories', error: err.message })
  }
}

// Create a category (admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Name required' })
    const category = await Category.create({ name })
    res.status(201).json(category)
  } catch (err) {
    res.status(500).json({ message: 'Could not create category', error: err.message })
  }
}

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const category = await Category.findByPk(id)
    if (!category) return res.status(404).json({ message: 'Category not found' })
    category.name = name
    await category.save()
    res.json(category)
  } catch (err) {
    res.status(500).json({ message: 'Could not update category', error: err.message })
  }
}

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) return res.status(404).json({ message: 'Category not found' })
    await category.destroy()
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ message: 'Could not delete category', error: err.message })
  }
}
