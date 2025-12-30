const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllNews, toggleLike } = require('../controllers/newsController');

router.get('/', getAllNews);
router.put('/:id/like', auth, toggleLike);

module.exports = router;
