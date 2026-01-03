const express = require('express');
const auth = require('../middleware/auth');
const { createLiveKitToken } = require('../utils/livekit');

const router = express.Router();

router.post('/start', auth, (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error('❌ req.user missing:', req.user);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (
      !process.env.LIVEKIT_API_KEY ||
      !process.env.LIVEKIT_API_SECRET
    ) {
      console.error('❌ LiveKit env vars missing');
      return res.status(500).json({ message: 'LiveKit not configured' });
    }

    const room = `live-${req.user.id}`;

    const token = createLiveKitToken({
      room,
      userId: req.user.id,
      canPublish: true,
    });

    return res.json({ room, token });
  } catch (err) {
    console.error('❌ LIVE START ERROR:', err);
    return res.status(500).json({ message: 'Failed to start live' });
  }
});

module.exports = router;
