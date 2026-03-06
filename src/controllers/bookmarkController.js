const Bookmark = require('../models/Bookmark');

// Add bookmark
exports.addBookmark = async (req, res, next) => {
  try {
    const { article } = req.body;
    if (!article) return res.status(400).json({ message: "Article ID required" });

    const bookmark = await Bookmark.create({ user: req.user._id, article });
    res.status(201).json(bookmark);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Already bookmarked" });
    next(err);
  }
};

// Get all bookmarks for user
exports.getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate('article', 'title slug');
    res.json(bookmarks);
  } catch (err) { next(err); }
};

// Remove bookmark
exports.removeBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ user: req.user._id, article: req.params.articleId });
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json({ message: "Bookmark removed" });
  } catch (err) { next(err); }
};
