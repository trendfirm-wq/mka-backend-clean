const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // TEMP response (for testing)
    return res.json({
      avatar: 'https://example.com/test-avatar.jpg',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Avatar upload failed' });
  }
});

module.exports = router;
