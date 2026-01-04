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

/* ================= MARK AS READ ================= */
router.patch('/:id/read', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('❌ MARK READ ERROR:', err);
    res.status(500).json({ message: 'Failed to mark as read' });
  }
});

/* ================= DELETE NOTIFICATION ================= */
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ DELETE NOTIFICATION ERROR:', err);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

/* ================= UNREAD COUNT (BADGE) ================= */
router.get('/count/unread', async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      isRead: false,
    });

    res.json({ count });
  } catch (err) {
    console.error('❌ UNREAD COUNT ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch unread count' });
  }
});

module.exports = router;
