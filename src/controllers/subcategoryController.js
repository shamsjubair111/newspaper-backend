const Subcategory = require('../models/Subcategory');
const slugify = require('../utils/slugify');

// Create subcategory (admin)
exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) return res.status(400).json({ message: 'Name and category required' });

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

// Update subcategory (admin)
exports.updateSubcategory = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });

    const updateData = { name, slug: slugify(name) };
    if (category) updateData.category = category;

    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('category', 'name slug');

    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(subcategory);
  } catch (err) { next(err); }
};

// Delete subcategory (admin)
exports.deleteSubcategory = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.json({ success: true, message: 'Subcategory deleted' });
  } catch (err) { next(err); }
};