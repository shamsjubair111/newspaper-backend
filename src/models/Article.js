const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  articleAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  content:       { type: String, required: true },
  thumbnail:     { type: String },
  images:        { type: [String], default: [] },
  videoUrl:      { type: String, default: '' },
  author:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:      { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory:   { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  slayout:       { type: String, default: 'default' },
  publishedAt:   { type: Date, default: Date.now },
  createdAt:     { type: Date, default: Date.now },
  updatedAt:     { type: Date, default: Date.now }
});

ArticleSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Article', ArticleSchema);