const express = require('express');
const router = express.Router();
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Public: get articles
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Author/Admin: create/update/delete
router.post('/', authMiddleware, authorizeRoles('author','admin'), createArticle);
router.put('/:id', authMiddleware, authorizeRoles('author','admin'), updateArticle);
router.delete('/:id', authMiddleware, authorizeRoles('author','admin'), deleteArticle);

module.exports = router;
