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

// MongoDB connectionrequire('dotenv').config();
mongoose.connect(process.env.MONGO_URI)

// API endpoint for frontend to send messages
app.post('/api/messages/send', async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({ content });
    await message.save();
    res.status(201).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Server-side rendered messages page
app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.render('messages', { messages });
});

// Delete message
app.post('/messages/delete/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect('/messages');
});

app.listen(3000, () => console.log('Server running on port 3000'));