const express = require('express');
const Live = require('../models/Live');
const { createLiveInput } = require('../utils/cloudflareStream');
const auth = require('../middleware/auth');

const router = express.Router();

/* ================= START LIVE ================= */
router.post('/start', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('▶️ START LIVE for user:', userId);

    const existingLive = await Live.findOne({ userId, isLive: true });
    console.log('Existing live:', existingLive);

    if (existingLive) {
      return res.status(400).json({ message: 'You are already live' });
    }

    console.log('⏳ Creating Cloudflare live input...');
    const stream = await createLiveInput();
    console.log('✅ Cloudflare stream created:', stream);

   const live = await Live.create({
  userId,
  title: req.body.title || 'Live Broadcast',
  isLive: true,
  streamId: stream.streamId,      // 🔥 REQUIRED FIELD
  webrtcUrl: stream.webrtcUrl,    // (optional but used)
  playbackUrl: stream.playbackUrl,
});


    console.log('✅ Live saved in DB:', live._id);

    res.json({
      message: 'Live started',
      liveId: live._id,
      webrtcUrl: stream.webrtcUrl,
      playbackUrl: stream.playbackUrl,
    });
  } catch (err) {
    console.error('❌ START LIVE ERROR:', err);
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
router.post('/webrtc/offer', auth, async (req, res) => {
  try {
    const { sdp } = req.body;

    console.log('📩 Received SDP offer');

    const live = await Live.findOne({ userId: req.user.id, isLive: true });

    if (!live) {
      console.error('❌ No live session found');
      return res.status(400).json({ message: 'No active live session' });
    }

    if (!live.webrtcUrl) {
      console.error('❌ webrtcUrl missing in DB');
      return res.status(400).json({ message: 'WebRTC URL missing' });
    }

    const cfRes = await fetch(live.webrtcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/sdp' },
      body: sdp,
    });

    const answerSDP = await cfRes.text();

    console.log('📨 Cloudflare answer length:', answerSDP.length);

    if (!answerSDP) {
      console.error('❌ Empty SDP answer from Cloudflare');
      return res.status(500).json({ message: 'Empty SDP answer' });
    }

    res.json({
      type: 'answer',
      sdp: answerSDP,
    });
  } catch (err) {
    console.error('❌ WebRTC signaling error:', err);
    res.status(500).json({ message: 'WebRTC signaling failed' });
  }
});
router.get('/active', async (req, res) => {
  const live = await Live.findOne({ isLive: true }).sort({ createdAt: -1 });

  if (!live) {
    return res.json(null);
  }

  res.json({
    playbackUrl: live.playbackUrl,
    title: live.title,
  });
});


module.exports = router;
