const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

/* ➕ ADD COMMENT */
router.post('/shorts/:shortId', auth, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment required' });

  const comment = await Comment.create({
    shortId: req.params.shortId,
    userId: req.user.id,
    text,
  });

  res.json(comment);
});

/* 📥 GET COMMENTS */
router.get('/shorts/:shortId', async (req, res) => {
  const comments = await Comment.find({ shortId: req.params.shortId })
    .sort({ createdAt: -1 });

  res.json(comments);
});

/* 🔢 COUNT */
router.get('/shorts/:shortId/count', async (req, res) => {
  const count = await Comment.countDocuments({
    shortId: req.params.shortId,
  });

  res.json({ count });
});

module.exports = router;
