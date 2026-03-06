const express = require('express');
const router = express.Router();
const { createComment, getComments, getMyComments, deleteComment } = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/my', authMiddleware, getMyComments);                        // my comments
router.get('/:articleId', getComments);                                  // article comments (public)
router.post('/:articleId', authMiddleware, createComment);               // post comment
router.delete('/single/:commentId', authMiddleware, deleteComment);      // delete comment

module.exports = router;