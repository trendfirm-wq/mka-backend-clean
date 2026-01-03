const express = require('express');
const router = express.Router();

const Short = require('../models/Short');

/**
 * GET APPROVED SHORTS (PUBLIC FEED)
 * GET /api/shorts
 */
router.get('/', async (req, res) => {
  try {
    const shorts = await Short.find({ status: 'approved' })
      .sort({ createdAt: -1 });

    res.json(shorts);
  } catch (err) {
    console.error('Get shorts error:', err);
    res.status(500).json({ message: 'Failed to load shorts' });
  }
});

/**
 * TEMP: SEED SHORTS (REMOVE AFTER USE)
 * GET /api/shorts/seed
 */
router.get('/seed', async (req, res) => {
  try {
    await Short.deleteMany({});

    await Short.insertMany([
      {
        videoKey: 'short1.mp4',
        caption: 'Ijtema moments 🇬🇭',
        author: 'system',
        status: 'approved', // 🔥 IMPORTANT
        answers: [],
      },
      {
        videoKey: 'short2.mp4',
        caption: 'Brotherhood & discipline',
        author: 'system',
        status: 'approved',
        answers: [],
      },
      {
        videoKey: 'short3.mp4',
        caption: 'Khuddam in action',
        author: 'system',
        status: 'approved',
        answers: [],
      },
    ]);

    res.json({ message: 'Shorts seeded successfully (approved)' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seeding failed' });
  }
});

module.exports = router;
adminShortsRoutes.js