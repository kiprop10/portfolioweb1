const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
const messageRoutes = require('./routes/messages');
const blogRoutes = require('./routes/blog'); // Add blog routes
app.use(messageRoutes);
app.use(blogRoutes); // Register blog routes

// Default route (homepage)
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('Server running on port 3000'));