const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },  // Optional for Google OAuth users
  googleId: { type: String, default: null },     // Google OAuth ID
  avatar: { type: String, default: null },       // Profile picture from Google
  role: { type: String, enum: ['user','author','admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving (only if password exists)
UserSchema.pre('save', async function(next){
  if(!this.password) return next();
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);