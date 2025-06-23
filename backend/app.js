const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Message = require('./models/message');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// MongoDB connectionrequire('dotenv').config()
require('dotenv').config(); // must come before you use process.env

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// API endpoint for frontend to send messages
// ...existing code...
app.post('/api/messages/send', async (req, res) => {
  try {
    const { contact, content } = req.body;

    // Basic validation
    if (!contact || !content) {
      return res.status(400).json({ success: false, error: 'Contact and message are required.' });
    }

    // Optional: Validate contact as email or phone (simple regex)
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
// ...existing code...

// Server-side rendered messages page
// ...existing code...
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages); // Now includes contact field
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// ...existing code...

// Delete message
app.post('/messages/delete/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect('/messages');
});

app.listen(3000, () => console.log('Server running on port 3000'));