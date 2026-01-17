const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const {
  createNews,
  getAllNews,
  getSingleNews,
  toggleLike,
} = require('../controllers/newsController');

/* ===========================
    CREATE NEWS (POST)
    POST /api/news
    Protected
=========================== */
router.post('/', auth, createNews);

/* ===========================
    GET ALL NEWS
    GET /api/news
=========================== */
router.get('/', getAllNews);

/* ===========================
    GET SINGLE NEWS ARTICLE
    GET /api/news/:id
=========================== */
router.get('/:id', getSingleNews);

/* ===========================
    LIKE / UNLIKE NEWS
    PUT /api/news/:id/like
    Protected
=========================== */
router.put('/:id/like', auth, toggleLike);

module.exports = router;
