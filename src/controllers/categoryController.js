const Category = require('../models/Category');
const slugify = require('../utils/slugify');

// Create category (admin)
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json(category);
  } catch (err) { next(err); }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) { next(err); }
};
