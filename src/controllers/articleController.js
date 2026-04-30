const Article = require('../models/Article');
const slugify = require('../utils/slugify');

// Create article
exports.createArticle = async (req, res, next) => {
  try {
    const { title, content, category, subcategory, slayout, thumbnail, authorName, videoUrl } = req.body;
    if (!title || !content || !category) return res.status(400).json({ message: "Title, content, category required" });

    const article = await Article.create({
      title,
      authorName: authorName || '',
      content,
      category,
      subcategory,
      slayout: slayout || 'default',
      thumbnail,
      videoUrl: videoUrl || '',
      author: req.user._id
    });

    res.status(201).json(article);
  } catch (err) { next(err); }
};

// Get all articles
exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find()
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');
    res.json(articles);
  } catch (err) { next(err); }
};

// Get single article
exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) { next(err); }
};

// Update article (admin only)
exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    // Whitelist only safe fields
    const allowedFields = ['title', 'authorName', 'content', 'thumbnail', 'videoUrl', 'category', 'subcategory', 'slayout'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) article[field] = req.body[field];
    });

    article.updatedAt = Date.now();
    await article.save();

    res.json(article);
  } catch (err) { next(err); }
};

// Delete article
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (err) { next(err); }
};