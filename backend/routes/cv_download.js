const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();

const CV_PASSWORD = process.env.CV_DOWNLOAD_PASSWORD || 'yourpassword';
const JWT_SECRET = process.env.CV_JWT_SECRET || 'yoursecret';

// POST /cv/password-check (AJAX)
router.post('/cv/password-check', (req, res) => {
  const { password } = req.body;
    if (password !== CV_PASSWORD) {
        return res.status(401).json({ error: 'Incorrect password' });
          }
            const token = jwt.sign({ access: true }, JWT_SECRET, { expiresIn: '5m' });
              res.json({ token });
              });

              // GET /cv/download?token=...
              router.get('/cv/download', (req, res) => {
                const { token } = req.query;
                  if (!token) return res.status(401).send('Unauthorized');
                    try {
                        jwt.verify(token, JWT_SECRET);
                            const filePath = path.join(__dirname, '../uploads/KipropMutai-CV.pdf');
                                res.download(filePath, 'KipropMutai-CV.pdf');
                                  } catch (err) {
                                      res.status(401).send('Invalid or expired token');
                                        }
                                        });

                                        module.exports = router;