const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');  // ✅ ADD THIS

const upload = multer({ dest: 'uploads/' });

/* 🔐 Cloudinary config */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      width: 500,          // Higher quality than before
      height: 500,
      crop: 'limit',
    });

    // 🔥 Save the URL in MongoDB
    await User.findByIdAndUpdate(req.user.id, {
      avatar: result.secure_url,
    });

    return res.json({
      avatar: result.secure_url,   // Send back new image URL
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Avatar upload failed' });
  }
});

module.exports = router;
