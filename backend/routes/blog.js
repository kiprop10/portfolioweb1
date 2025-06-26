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

// Get all blogs (for frontend)
router.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Blog form for creating a new blog (admin)
router.get('/blog/new', (req, res) => {
  res.render('blog_form', { blog: {}, action: '/blog/new', button: 'Add Blog' });
});

// Handle new blog POST (admin)
router.post('/blog/new', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? '/uploads/' + req.file.filename : '';
  await Blog.create({ title, content, imageUrl, comments: [] });
  res.redirect('/blog');
});

// Blog form for editing a blog (admin)
router.get('/blog/edit/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('blog_form', { blog, action: `/blog/edit/${blog._id}`, button: 'Update Blog' });
});

// Handle blog update POST (admin)
router.post('/blog/edit/:id', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  let update = { title, content };
  if (req.file) update.imageUrl = '/uploads/' + req.file.filename;
  await Blog.findByIdAndUpdate(req.params.id, update);
  res.redirect('/blog');
});

// Blog detail page (server-rendered)
router.get('/blog/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).send('Blog not found');
  res.render('blog_detail', { blog });
});

// Admin blog management page (server-rendered)
router.get('/blog', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render('blog', { blogs });
});

// Get single blog by ID (for "see more" detail)
router.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json(blog);
});

// Add new blog (admin, with image)
router.post('/api/blogs', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? '/uploads/' + req.file.filename : '';
  const blog = await Blog.create({ title, content, imageUrl, comments: [] });
  res.status(201).json(blog);
});

// Edit blog (admin, with image)
router.put('/api/blogs/:id', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  let update = { title, content };
  if (req.file) update.imageUrl = '/uploads/' + req.file.filename;
  const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(blog);
});

// Delete blog (admin)
router.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Add comment
router.post('/api/blogs/:id/comments', async (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) return res.status(400).json({ error: 'Author and text required' });
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  blog.comments.push({ author, text });
  await blog.save();
  res.json(blog);
});

// Edit comment
router.put('/api/blogs/:blogId/comments/:commentId', async (req, res) => {
  const { text } = req.body;
  const blog = await Blog.findById(req.params.blogId);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  const comment = blog.comments.id(req.params.commentId);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  comment.text = text;
  await blog.save();
  res.json(blog);
});

// Delete comment
router.delete('/api/blogs/:blogId/comments/:commentId', async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  blog.comments.id(req.params.commentId).remove();
  await blog.save();
  res.json(blog);
});

module.exports = router;