const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');

// === Multer Setup for Image Uploads ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ========== API ROUTES (Frontend) ==========

// Get all blogs (used by Angular)
router.get('/api/blogs', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store'); // 🔄 Disable caching for fresh data
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog by ID
router.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Add comment to blog
router.post('/api/blogs/:id/comments', async (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) return res.status(400).json({ error: 'Author and text required' });

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.comments.push({ author, text });
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// ========== ADMIN ROUTES (Server-Rendered Views) ==========

// Blog management dashboard
router.get('/blog', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render('blog', { blogs });
});

// Form to create new blog
router.get('/blog/new', (req, res) => {
  res.render('blog_form', {
    blog: {},
    action: '/blog/new',
    button: 'Add Blog'
  });
});

// Handle creation of new blog
router.post('/blog/new', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? '/uploads/' + req.file.filename : '';
  await Blog.create({ title, content, imageUrl, comments: [] });
  res.redirect('/blog');
});

// Form to edit existing blog
router.get('/blog/edit/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('blog_form', {
    blog,
    action: `/blog/edit/${blog._id}`,
    button: 'Update Blog'
  });
});

// Handle blog update
router.post('/blog/edit/:id', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const update = { title, content };

  if (req.file) {
    update.imageUrl = '/uploads/' + req.file.filename;
  }

  await Blog.findByIdAndUpdate(req.params.id, update);
  res.redirect('/blog');
});

// Blog detail view (server-rendered)
router.get('/blog/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).send('Blog not found');
  res.render('blog_detail', { blog });
});

// Handle blog deletion
router.post('/blog/delete/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/blog');
});

module.exports = router;