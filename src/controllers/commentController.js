const Comment = require('../models/Comment');

// Post a comment
exports.createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const comment = await Comment.create({
      user: req.user._id,
      article: req.params.articleId,
      content
    });

    const populated = await Comment.findById(comment._id)
      .populate('user', 'name email');

    res.status(201).json(populated);
  } catch (err) { next(err); }
};

// Get comments for an article (public)
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { next(err); }
};

// Get MY comments (logged in user)
exports.getMyComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ user: req.user._id })
      .populate('article', 'title')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { next(err); }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only the comment owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ success: true, message: "Comment deleted" });
  } catch (err) { next(err); }
};