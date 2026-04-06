const express = require('express');
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: get categories
router.get('/', getCategories);

// Admin-only: create, update, delete
router.post('/', authMiddleware, authorizeRoles('admin'), createCategory);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateCategory);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteCategory);

module.exports = router;