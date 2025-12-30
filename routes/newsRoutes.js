const express = require('express');
const router = express.Router();

const {
  getAllNews,
  toggleLike,
} = require('../controllers/newsController');

const auth = require('../middleware/authMiddleware');

/**
 * GET ALL NEWS
 * Public (login not required)
 */
router.get('/', getAllNews);

/**
 * LIKE / UNLIKE NEWS
 * Protected (login required)
 */
router.put('/:id/like', auth, toggleLike);


module.exports = router;
