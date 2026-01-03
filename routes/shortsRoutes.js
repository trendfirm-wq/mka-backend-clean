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
/**
 * CREATE SHORT (USER UPLOAD → PENDING)
 * POST /api/shorts
 */
router.post('/', async (req, res) => {
  try {
    const { videoKey, caption, author } = req.body;

    if (!videoKey || !author) {
      return res
        .status(400)
        .json({ message: 'videoKey and author are required' });
    }

    const short = await Short.create({
      videoKey,
      caption: caption || '',
      author,
      status: 'pending', // 🔥 FORCE MODERATION
    });

    res.json({
      message: 'Short submitted for review',
      shortId: short._id,
    });
  } catch (err) {
    console.error('Create short error:', err);
    res.status(500).json({ message: 'Failed to create short' });
  }
});
/**
 * TEMP: CREATE PENDING SHORT (BROWSER TEST)
 * GET /api/shorts/test-create
 * REMOVE AFTER TESTING
 */
router.get('/test-create', async (req, res) => {
  try {
    const short = await Short.create({
      videoKey: 'browser_test.mp4',
      caption: 'Created from browser test',
      author: 'browser@test.com',
      status: 'pending',
    });

    res.json({
      message: 'Pending short created',
      id: short._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create test short' });
  }
});

module.exports = router;
