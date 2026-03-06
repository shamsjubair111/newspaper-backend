const Comment = require('../models/Comment');

// Add comment
exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const comment = await Comment.create({
      content,
      user: req.user._id,
      article: req.params.articleId
    });

    res.status(201).json(comment);
  } catch (err) { next(err); }
};

// Get comments for article
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId })
      .populate('user', 'name email');
    res.json(comments);
  } catch (err) { next(err); }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (err) { next(err); }
};
