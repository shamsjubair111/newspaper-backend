const Author = require('../models/Author');

// Create author (admin only)
exports.createAuthor = async (req, res, next) => {
  try {
    const { name, profession, image } = req.body;
    if (!name || !profession) return res.status(400).json({ message: 'Name and profession are required' });

    const author = await Author.create({ name, profession, image: image || '' });
    res.status(201).json(author);
  } catch (err) { next(err); }
};

// Get all authors (public)
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
  } catch (err) { next(err); }
};

// Get single author (public)
exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (err) { next(err); }
};

// Update author (admin only) — image is NOT editable
exports.updateAuthor = async (req, res, next) => {
  try {
    const { name, profession } = req.body;
    if (!name || !profession) return res.status(400).json({ message: 'Name and profession are required' });

    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    author.name       = name;
    author.profession = profession;
    // image is intentionally excluded from updates
    await author.save();

    res.json(author);
  } catch (err) { next(err); }
};

// Delete author (admin only)
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json({ success: true, message: 'Author deleted' });
  } catch (err) { next(err); }
};