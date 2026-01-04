const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin'); // or isAdmin

// GET all quiz results (admin only)
router.get('/results', auth, admin, async (req, res) => {
  try {
    const results = await QuizResult.find()
      .populate('userId', 'email name')
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

module.exports = router;
