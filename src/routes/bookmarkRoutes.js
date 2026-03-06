const express = require('express');
const router = express.Router();
const { addBookmark, removeBookmark, getMyBookmarks, checkBookmark } = require('../controllers/bookmarkController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, addBookmark);
router.delete('/:articleId', authMiddleware, removeBookmark);
router.get('/my', authMiddleware, getMyBookmarks);
router.get('/check/:articleId', authMiddleware, checkBookmark);

module.exports = router;