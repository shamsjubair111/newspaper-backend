const Bookmark = require('../models/Bookmark');
const Article = require('../models/Article');

// Add bookmark
exports.addBookmark = async (req, res, next) => {
  try {
    const { articleId } = req.body;
    if (!articleId) return res.status(400).json({ message: "Article ID required" });

    const existing = await Bookmark.findOne({ user: req.user._id, article: articleId });
    if (existing) return res.status(400).json({ message: "Already bookmarked" });

    const bookmark = await Bookmark.create({ user: req.user._id, article: articleId });
    res.status(201).json({ success: true, bookmark });
  } catch (err) { next(err); }
};

// Remove bookmark
exports.removeBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user._id,
      article: req.params.articleId
    });
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json({ success: true, message: "Bookmark removed" });
  } catch (err) { next(err); }
};

// Get my bookmarks
exports.getMyBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate({
        path: 'article',
        populate: [
          { path: 'category', select: 'name' },
          { path: 'subcategory', select: 'name' }
        ]
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) { next(err); }
};

// Check if bookmarked
exports.checkBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOne({
      user: req.user._id,
      article: req.params.articleId
    });
    res.json({ isBookmarked: !!bookmark });
  } catch (err) { next(err); }
};