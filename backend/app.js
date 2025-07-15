const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve uploaded images publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Static and View Setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// ✅ Import Routes
const messageRoutes = require('./routes/messages');
const blogRoutes = require('./routes/blog');
const cvRoutes = require('./routes/cv'); // ⬅️ Replaced direct CV logic

// ✅ Use Routes
app.use(messageRoutes);
app.use(blogRoutes);
app.use('/cv', cvRoutes); // ⬅️ Use modular CV route

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