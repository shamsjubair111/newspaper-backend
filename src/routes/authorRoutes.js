const express = require('express');
const router  = express.Router();
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: list & detail
router.get('/',    getAuthors);
router.get('/:id', getAuthorById);

// Admin only: create, update (no image), delete
router.post('/',      authMiddleware, authorizeRoles('admin'), createAuthor);
router.put('/:id',    authMiddleware, authorizeRoles('admin'), updateAuthor);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteAuthor);

module.exports = router;