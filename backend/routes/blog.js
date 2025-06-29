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

    // --------- API ROUTES (for frontend) ---------

    // Get all blogs (frontend)
    router.get('/api/blogs', async (req, res) => {
      const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
        });

        // Get single blog by ID (frontend detail)
        router.get('/api/blogs/:id', async (req, res) => {
          const blog = await Blog.findById(req.params.id);
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
              res.json(blog);
              });

              // Add comment to blog (frontend)
              router.post('/api/blogs/:id/comments', async (req, res) => {
                const { author, text } = req.body;
                  if (!author || !text) return res.status(400).json({ error: 'Author and text required' });
                    const blog = await Blog.findById(req.params.id);
                      if (!blog) return res.status(404).json({ error: 'Blog not found' });
                        blog.comments.push({ author, text });
                          await blog.save();
                            res.json(blog);
                            });

                            // --------- ADMIN ROUTES (server-rendered) ---------

                            // Blog management page (admin)
                            router.get('/blog', async (req, res) => {
                              const blogs = await Blog.find().sort({ createdAt: -1 });
                                res.render('blog', { blogs });
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

                                                        // Blog detail page (admin, server-rendered)
                                                        router.get('/blog/:id', async (req, res) => {
                                                          const blog = await Blog.findById(req.params.id);
                                                            if (!blog) return res.status(404).send('Blog not found');
                                                              res.render('blog_detail', { blog });
                                                              });

                                                              // Delete blog (admin)
                                                              router.post('/blog/delete/:id', async (req, res) => {
                                                                await Blog.findByIdAndDelete(req.params.id);
                                                                  res.redirect('/blog');
                                                                  });

                                                                  module.exports = router;