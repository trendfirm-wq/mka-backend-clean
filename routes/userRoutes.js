const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ dest: 'uploads/' });

/* 🔐 Cloudinary config */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/* ⭐ FIXED AVATAR UPLOAD — NO COMPRESSION, NO RESIZE */
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      quality: "100",        // 🔥 KEEP FULL QUALITY
      fetch_format: "auto",  // 🔥 Best format (png/webp)
      flags: "lossless",     // 🔥 No compression
      dpr: "2.0",            // 🔥 High pixel density for retina
      transformation: [],    // 🔥 DO NOT RESIZE / DO NOT CROP
    });

    return res.json({
      avatar: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Avatar upload failed' });
  }
});

module.exports = router;
