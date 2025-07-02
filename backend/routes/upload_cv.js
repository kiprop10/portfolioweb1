const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'KipropMutai-CV.pdf') // Always overwrite
});
const upload = multer({ storage });

// GET: Upload form (admin view)
router.get('/upload_cv', (req, res) => {
  res.render('upload_cv'); // Will load views/upload_cv.pug
});

// POST: Handle upload
router.post('/upload_cv', upload.single('cv'), (req, res) => {
  res.send('✅ CV uploaded successfully!');
});

module.exports = router;