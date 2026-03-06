const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Ensure user cannot bookmark same article twice
BookmarkSchema.index({ user: 1, article: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
