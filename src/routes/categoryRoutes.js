const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: get categories
router.get('/', getCategories);

// Admin-only: create category
router.post('/', authMiddleware, authorizeRoles('admin'), createCategory);

module.exports = router;
