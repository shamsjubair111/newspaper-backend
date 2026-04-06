const express = require('express');
const router = express.Router();
const { createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory } = require('../controllers/subcategoryController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: get subcategories
router.get('/', getSubcategories);

// Admin-only: create, update, delete
router.post('/', authMiddleware, authorizeRoles('admin'), createSubcategory);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateSubcategory);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteSubcategory);

module.exports = router;