const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

// === Multer Setup for Image Uploads ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ========== API ROUTES (Frontend: Angular) ==========

// Get all blogs (used by Angular)
router.get('/api/blogs', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
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
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('blog', { blogs });
  } catch (err) {
    res.status(500).send('Error loading blogs');
  }
});

// Show new blog form
router.get('/blog/new', (req, res) => {
  res.render('blog_form', {
    blog: {},
    action: '/blog/new',
    button: 'Create Blog'
  });
});

// Handle creation of new blog
router.post('/blog/new', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send('Title and content are required.');
    }

    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'style'],
        '*': ['style']
      }
    });

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : '';

    await Blog.create({ title, content: cleanContent, imageUrl, comments: [] });
    res.redirect('/blog');
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).send('Server error while creating blog.');
  }
});

// Show blog detail (server-rendered)
router.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blog_detail', { blog });
  } catch (err) {
    res.status(500).send('Error loading blog');
  }
});

// Show edit form
router.get('/blog/edit/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blog_form', {
      blog,
      action: `/blog/edit/${blog._id}`,
      button: 'Update Blog'
    });
  } catch (err) {
    res.status(500).send('Error loading blog for edit');
  }
});

// Handle blog update
router.post('/blog/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'style'],
        '*': ['style']
      }
    });

    const update = { title, content: cleanContent };
    if (req.file) {
      update.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    await Blog.findByIdAndUpdate(req.params.id, update);
    res.redirect('/blog');
  } catch (err) {
    res.status(500).send('Error updating blog');
  }
});

// Handle blog deletion
router.post('/blog/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blog');
  } catch (err) {
    res.status(500).send('Error deleting blog');
  }
});

module.exports = router;