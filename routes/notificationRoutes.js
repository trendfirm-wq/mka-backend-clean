const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

/* ================= GET USER NOTIFICATIONS ================= */
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error('❌ FETCH NOTIFICATIONS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

/* ================= MARK AS READ ================= */
router.patch('/:id/read', auth, async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isRead: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ MARK READ ERROR:', err);
    res.status(500).json({ message: 'Failed to mark as read' });
  }
});

/* ================= DELETE NOTIFICATION ================= */
router.delete('/:id', auth, async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('❌ DELETE NOTIFICATION ERROR:', err);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

/* ================= UNREAD COUNT (BADGE) ================= */
router.get('/count/unread', auth, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false,
    });

    res.json({ count });
  } catch (err) {
    console.error('❌ UNREAD COUNT ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch unread count' });
  }
});

module.exports = router;
