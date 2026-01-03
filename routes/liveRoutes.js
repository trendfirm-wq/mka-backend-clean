const express = require('express');
const Live = require('../models/Live');
const { createLiveInput } = require('../utils/cloudflareStream');
const auth = require('../middleware/auth');

const router = express.Router();

/* ================= START LIVE ================= */
router.post('/start', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Prevent multiple live sessions per user
    const existingLive = await Live.findOne({ userId, isLive: true });
    if (existingLive) {
      return res.status(400).json({ message: 'You are already live' });
    }

    // Create Cloudflare Live Input
    const stream = await createLiveInput();

    // Save Live session
    const live = await Live.create({
      userId,
      title: req.body.title || 'Live Broadcast',
      streamId: stream.streamId,
      playbackUrl: stream.playbackUrl,
    });

    res.json({
      message: 'Live started',
      rtmpUrl: stream.rtmpUrl,
      streamKey: stream.streamKey,
      playbackUrl: stream.playbackUrl,
      liveId: live._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to start live' });
  }
});

/* ================= GET ACTIVE LIVES ================= */
router.get('/active', async (req, res) => {
  try {
    const lives = await Live.find({ isLive: true })
      .sort({ startedAt: -1 })
      .select('title playbackUrl startedAt userId');

    res.json(lives);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch live sessions' });
  }
});

/* ================= STOP LIVE ================= */
router.post('/stop', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const live = await Live.findOne({ userId, isLive: true });
    if (!live) {
      return res.status(404).json({ message: 'No active live found' });
    }

    live.isLive = false;
    live.endedAt = new Date();
    await live.save();

    res.json({ message: 'Live ended successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to stop live' });
  }
});
/* ================= STOP LIVE ================= */
router.post('/stop', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const live = await Live.findOne({ userId, isLive: true });

    if (!live) {
      return res.json({ message: 'No active live session' });
    }

    live.isLive = false;
    await live.save();

    res.json({ message: 'Live stopped' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to stop live' });
  }
});

module.exports = router;
