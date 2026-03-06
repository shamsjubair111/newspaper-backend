const User = require('../models/User');

// Get all users (admin only)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) { next(err); }
};

// Get single user
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!role || !['user', 'author', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be: user, author, or admin" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, message: `User role updated to ${role}`, user });
  } catch (err) { next(err); }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) { next(err); }
};