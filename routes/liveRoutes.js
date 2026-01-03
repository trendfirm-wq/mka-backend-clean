const express = require('express');
const auth = require('../middleware/auth');
const { createLiveKitToken } = require('../utils/livekit');

const router = express.Router();

/* 🔴 START LIVE (PUBLISHER) */
router.post('/start', auth, (req, res) => {
  const room = `live-${req.user.id}`;

  const token = createLiveKitToken({
    room,
    userId: req.user.id,
    canPublish: true,
  });

  res.json({ room, token });
});

/* 👀 JOIN LIVE (VIEWER) */
router.get('/join/:room', auth, (req, res) => {
  const token = createLiveKitToken({
    room: req.params.room,
    userId: req.user.id,
    canPublish: false,
  });

  res.json({ token });
});

module.exports = router;
