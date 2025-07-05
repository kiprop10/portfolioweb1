const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();

// ✅ Load secret and password from environment
const JWT_SECRET = process.env.CV_JWT_SECRET;
const CV_PASSWORD = process.env.CV_DOWNLOAD_PASSWORD;

// ✅ GET /cv — Show password form with optional error
router.get('/cv', (req, res) => {
  const errorParam = req.query.error;
  let error = null;

  if (errorParam === 'expired') {
    error = 'Session expired. Please try again.';
  } else if (errorParam === 'unauthorized') {
    error = 'Unauthorized access. Enter password again.';
  }

  res.render('/download_cv', { error });
});

// ✅ POST /cv — Validate password, generate token
router.post('/cv', (req, res) => {
  const { password } = req.body;

  if (password !== CV_PASSWORD) {
    return res.render('/download_cv', { error: 'Incorrect password. Try again.' });
  }

  // Generate short-lived token
  const token = jwt.sign({ access: true }, JWT_SECRET, { expiresIn: '5m' });
  res.redirect(`/cv/verify?token=${token}`);
});

// ✅ GET /cv/verify — Check token and trigger download
router.get('/cv/verify', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect('/cv?error=unauthorized');
  }

  try {
    jwt.verify(token, JWT_SECRET);
    const filePath = path.join(__dirname, '../uploads/KipropMutai-CV.pdf');
    return res.download(filePath, 'KipropMutai-CV.pdf');
  } catch (err) {
    return res.redirect('/cv?error=expired');
  }
});

module.exports = router;