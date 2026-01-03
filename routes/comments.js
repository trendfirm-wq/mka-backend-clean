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

    // OPTIONAL: populate email for immediate response
    await comment.populate('userId', 'email');

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
      .populate('userId', 'email') // ✅ THIS IS THE IMPORTANT LINE
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
