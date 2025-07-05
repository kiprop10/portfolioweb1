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

// ✅ Import Routes FIRST
//const cvRoutes = require('./routes/cv');
const uploadCVRoutes = require('./routes/upload_cv');
const downloadCVRoutes = require('./routes/download_cv');
const messageRoutes = require('./routes/messages');
const blogRoutes = require('./routes/blog');
//const uploadCVRoutes = require('./routes/upload_cv');
// ✅ Use Routes AFTER Importing
app.use(uploadCVRoutes);
app.use(downloadCVRoutes);
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
      app.listen(3000, () => console.log('Server running on port 3000'));