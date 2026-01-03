const express = require('express');
const router = express.Router();

const Short = require('../models/Short');

/**
 * GET ALL PENDING SHORTS (ADMIN)
 * GET /api/admin/shorts/pending
 */
router.get('/pending', async (req, res) => {
  try {
    const shorts = await Short.find({ status: 'pending' })
      .sort({ createdAt: -1 });

    res.json(shorts);
  } catch (err) {
    console.error('Get pending shorts error:', err);
    res.status(500).json({ message: 'Failed to load pending shorts' });
  }
});

/**
 * APPROVE OR REJECT A SHORT (ADMIN)
 * PATCH /api/admin/shorts/:id
 * body: { status: "approved" | "rejected" }
 */
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const short = await Short.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!short) {
      return res.status(404).json({ message: 'Short not found' });
    }

    res.json(short);
  } catch (err) {
    console.error('Update short status error:', err);
    res.status(500).json({ message: 'Failed to update short status' });
  }
});

module.exports = router;
