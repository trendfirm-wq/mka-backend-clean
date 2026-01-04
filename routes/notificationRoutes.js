const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

/* ================= GET ALL NOTIFICATIONS ================= */
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error('❌ FETCH NOTIFICATIONS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

module.exports = router;
