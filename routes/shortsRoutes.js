const express = require('express');
const router = express.Router();

const {
  getAllShorts,
} = require('../controllers/shortsController');

/**
 * GET ALL SHORTS
 * GET /api/shorts
 */
router.get('/', getAllShorts);

/**
 * TEMP: SEED SHORTS (REMOVE AFTER USE)
 * GET /api/shorts/seed
 */
router.get('/seed', async (req, res) => {
  try {
    const Short = require('../models/Short');

    await Short.deleteMany({});

  await Short.insertMany([
  {
    videoKey: 'short1.mp4',
    caption: 'Ijtema moments 🇬🇭',
    answers: [],
  },
  {
    videoKey: 'short2.mp4',
    caption: 'Brotherhood & discipline',
    answers: [],
  },
  {
    videoKey: 'short3.mp4',
    caption: 'Khuddam in action',
    answers: [],
  },
]);



    res.json({ message: 'Shorts seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seeding failed' });
  }
});

module.exports = router;
