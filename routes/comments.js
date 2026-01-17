const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

/* ================= ADD COMMENT ================= */
router.post('/shorts/:shortId', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text required' });
    }

    const comment = await Comment.create({
      shortId: req.params.shortId,
      userId: req.user.id,
      text,
    });

    // ✅ Populate BOTH email + avatar
    await comment.populate('userId', 'email avatar');

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save comment' });
  }
});

/* ================= GET COMMENTS ================= */
router.get('/shorts/:shortId', async (req, res) => {
  try {
    const comments = await Comment.find({
      shortId: req.params.shortId,
    })
      // ✅ Populate BOTH fields
      .populate('userId', 'email avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

/* ================= COUNT ================= */
router.get('/shorts/:shortId/count', async (req, res) => {
  try {
    const count = await Comment.countDocuments({
      shortId: req.params.shortId,
    });

    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to count comments' });
  }
});

module.exports = router;
