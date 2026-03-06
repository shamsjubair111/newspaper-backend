const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: get comments for article
router.get('/:articleId', getComments);

// Authenticated users: add comment
router.post('/:articleId', authMiddleware, addComment);

// Admin: delete comment
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteComment);

module.exports = router;
