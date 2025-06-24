const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Show all blogs (admin)
router.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('blog', { blogs });
  } catch (err) {
    res.status(500).send('Error loading blogs');
  }
});

// Add new blog (form)
router.get('/blog/new', (req, res) => {
  res.render('blog_form', { blog: {}, action: '/blog/new', button: 'Add Blog' });
});

// Handle new blog POST
router.post('/blog/new', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? '/uploads/' + req.file.filename : '';
    await Blog.create({ title, content, imageUrl, comments: [] });
    res.redirect('/blog');
  } catch (err) {
    res.status(500).send('Error creating blog');
  }
});

// Edit blog (form)
router.get('/blog/edit/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blog_form', { blog, action: `/blog/edit/${blog._id}`, button: 'Update Blog' });
  } catch (err) {
    res.status(500).send('Error loading blog');
  }
});

// Handle blog update
router.post('/blog/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let update = { title, content };
    if (req.file) update.imageUrl = '/uploads/' + req.file.filename;
    await Blog.findByIdAndUpdate(req.params.id, update);
    res.redirect('/blog');
  } catch (err) {
    res.status(500).send('Error updating blog');
  }
});

// Delete blog
router.post('/blog/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blog');
  } catch (err) {
    res.status(500).send('Error deleting blog');
  }
});

// Show single blog with comments (admin)
router.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blog_detail', { blog });
  } catch (err) {
    res.status(500).send('Error loading blog');
  }
});

// Add comment (admin)
router.post('/blog/:id/comment', async (req, res) => {
  try {
    const { author, text } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, {
      $push: { comments: { author, text } }
    });
    res.redirect(`/blog/${req.params.id}`);
  } catch (err) {
    res.status(500).send('Error adding comment');
  }
});

// --- REST API ENDPOINTS (FRONTEND) ---

// Get all blogs (JSON)
router.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Error loading blogs' });
  }
});

// Get single blog by ID (JSON)
router.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error loading blog' });
  }
});

// Create new blog (API)
router.post('/api/blogs', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? '/uploads/' + req.file.filename : '';
    const blog = await Blog.create({ title, content, imageUrl, comments: [] });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error creating blog' });
  }
});

// Update blog (API)
router.put('/api/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let update = { title, content };
    if (req.file) update.imageUrl = '/uploads/' + req.file.filename;
    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error updating blog' });
  }
});

// Delete blog (API)
router.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting blog' });
  }
});

// Add comment to blog (API)
router.post('/api/blogs/:id/comments', async (req, res) => {
  try {
    const { author, text } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { author, text } } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});

module.exports = router;