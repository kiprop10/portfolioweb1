const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Static and View Setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// ✅ Import Routes
const messageRoutes = require('./routes/messages');
const blogRoutes = require('./routes/blog');

// ✅ CV Download Route (AJAX + JWT)
const path = require('path');
const jwt = require('jsonwebtoken');
const CV_PASSWORD = process.env.CV_DOWNLOAD_PASSWORD || 'Kiprop1010';
const JWT_SECRET = process.env.CV_JWT_SECRET || 'downloadcvforkiprop1010';
const CV_FILENAME = process.env.CV_FILENAME || 'KipropMutai-CV.pdf';

// POST /cv/password-check (AJAX)
app.post('/cv/password-check', (req, res) => {
  const { password } = req.body;
  if (password !== CV_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  const token = jwt.sign({ access: true }, JWT_SECRET, { expiresIn: '5m' });
  res.json({ token });
});

// GET /cv/download?token=...
app.get('/cv/download', (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(401).send('Unauthorized');
  try {
    jwt.verify(token, JWT_SECRET);
    const filePath = path.join(__dirname, 'uploads', CV_FILENAME);
    res.download(filePath, CV_FILENAME);
  } catch (err) {
    res.status(401).send('Invalid or expired token');
  }
});

// ✅ Use Other Routes
app.use(messageRoutes);
app.use(blogRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
  res.render('index');
});

// ✅ MongoDB Connection (Optional)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));