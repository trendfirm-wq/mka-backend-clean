const express = require('express');
const router = express.Router();

/* ===============================
   UI LIKES (INDEX / NEWS / STORE)
   - In-memory (temporary)
   - No auth
================================ */

let uiLikes = [];
// shape: { userId, itemKey }

/**
 * TOGGLE UI LIKE
 * POST /api/likes/ui/toggle
 */
router.post('/ui/toggle', (req, res) => {
  const { userId, itemKey } = req.body;

  if (!userId || !itemKey) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const index = uiLikes.findIndex(
    l => l.userId === userId && l.itemKey === itemKey
  );

  if (index > -1) {
    uiLikes.splice(index, 1);
  } else {
    uiLikes.push({ userId, itemKey });
  }

  const count = uiLikes.filter(l => l.itemKey === itemKey).length;
  res.json({ count });
});

/**
 * GET UI LIKE COUNTS
 * GET /api/likes/ui?userId=123
 */
router.get('/ui', (req, res) => {
  const userId = req.query.userId;

  const counts = {};
  const userLikes = {};

  uiLikes.forEach(like => {
    counts[like.itemKey] = (counts[like.itemKey] || 0) + 1;
    if (like.userId === userId) {
      userLikes[like.itemKey] = true;
    }
  });

  res.json({ counts, userLikes });
});

/* ===============================
   SHORTS LIKES (DATABASE)
   - MongoDB
   - Auth protected
   - Shared across accounts
================================ */

const protect = require('../middleware/authMiddleware');
const {
  toggleLike,
  getLikeCount,
  hasUserLiked,
} = require('../controllers/shortsController');

/**
 * TOGGLE SHORT LIKE
 * POST /api/likes/shorts/:id
 */
router.post('/shorts/:id', protect, toggleLike);

/**
 * GET SHORT LIKE COUNT
 * GET /api/likes/shorts/:id/count
 */
router.get('/shorts/:id/count', getLikeCount);

/**
 * CHECK IF USER LIKED SHORT
 * GET /api/likes/shorts/:id/status
 */
router.get('/shorts/:id/status', protect, hasUserLiked);

module.exports = router;
