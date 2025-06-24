const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// API endpoint for frontend to send messages
router.post('/api/messages/send', async (req, res) => {
  try {
    const { contact, content } = req.body;
    if (!contact || !content) {
      return res.status(400).json({ success: false, error: 'Contact and message are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      return res.status(400).json({ success: false, error: 'Contact must be a valid email or phone number.' });
    }
    const message = new Message({ contact, content });
    await message.save();
    res.status(201).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API endpoint to get all messages (JSON)
router.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Server-side rendered messages/contact page
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.render('messages', { messages });
  } catch (err) {
    res.status(500).send('Error loading messages');
  }
});

// Delete message
router.post('/messages/delete/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect('/messages');
});

module.exports = router; 