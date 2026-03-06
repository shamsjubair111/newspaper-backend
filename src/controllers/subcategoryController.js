const Subcategory = require('../models/Subcategory');
const slugify = require('../utils/slugify');

// Create subcategory (admin)
exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) return res.status(400).json({ message: "Name and category required" });

    const subcategory = await Subcategory.create({ name, slug: slugify(name), category });
    res.status(201).json(subcategory);
  } catch (err) { next(err); }
};

// Get all subcategories
exports.getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name slug');
    res.json(subcategories);
  } catch (err) { next(err); }
};
