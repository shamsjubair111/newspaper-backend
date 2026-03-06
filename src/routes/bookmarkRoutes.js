const express = require('express');
const router = express.Router();
const { addBookmark, getBookmarks, removeBookmark } = require('../controllers/bookmarkController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Authenticated users only
router.use(authMiddleware);

// Add bookmark
router.post('/', addBookmark);

// Get user bookmarks
router.get('/', getBookmarks);

// Remove bookmark
router.delete('/:articleId', removeBookmark);

module.exports = router;
