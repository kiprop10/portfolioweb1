const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const router = express.Router();

// === Config ===
const CV_PASSWORD = process.env.CV_DOWNLOAD_PASSWORD || 'Kiprop1010';
const JWT_SECRET = process.env.CV_JWT_SECRET || 'downloadcvforkiprop1010';
const CV_FILENAME = 'KipropMutai-CV.pdf';
const UPLOAD_DIR = path.join(__dirname, '../uploads');
const CV_FILE_PATH = path.join(UPLOAD_DIR, CV_FILENAME);

// === Multer Setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, CV_FILENAME); // Rename uploaded file
  }
});
const upload = multer({ storage });

// === Render Upload Page ===
router.get('/upload', (req, res) => {
  res.render('cv_upload'); // This should match views/cv_upload.pug
});

// === Handle Upload ===
router.post('/upload', upload.single('cvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.redirect('/cv/upload?success=true');
});

// === Password Check ===
router.post('/password-check', (req, res) => {
  const { password } = req.body;
  if (password !== CV_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  const token = jwt.sign({ access: true }, JWT_SECRET, { expiresIn: '5m' });
  res.json({ token });
});

// === Download Route ===
router.get('/download', (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(401).send('Unauthorized');
  try {
    jwt.verify(token, JWT_SECRET);
    res.download(CV_FILE_PATH, CV_FILENAME);
  } catch (err) {
    res.status(401).send('Invalid or expired token');
  }
});

module.exports = router;