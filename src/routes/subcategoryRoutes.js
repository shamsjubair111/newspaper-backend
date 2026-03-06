const express = require('express');
const router = express.Router();
const { createSubcategory, getSubcategories } = require('../controllers/subcategoryController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: get subcategories
router.get('/', getSubcategories);

// Admin-only: create subcategory
router.post('/', authMiddleware, authorizeRoles('admin'), createSubcategory);

module.exports = router;
