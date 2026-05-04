const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  profession: { type: String, required: true },
  image:      { type: String, default: '' },
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now }
});

AuthorSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Author', AuthorSchema);