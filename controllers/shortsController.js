const Short = require('../models/Short');
const ShortLike = require('../models/ShortLike');

/* ===============================
   TOGGLE LIKE / UNLIKE
================================ */
exports.toggleLike = async (req, res) => {
  try {
    const shortId = req.params.id;
    const userId = req.user._id;

    const existingLike = await ShortLike.findOne({
      short: shortId,
      user: userId,
    });

    if (existingLike) {
      await ShortLike.deleteOne({ _id: existingLike._id });
    } else {
      await ShortLike.create({
        short: shortId,
        user: userId,
      });
    }

    const count = await ShortLike.countDocuments({
      short: shortId,
    });

    res.json({
      liked: !existingLike,
      count, // 👈 THIS MUST EXIST
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


/* ===============================
   GET LIKE COUNT
================================ */
exports.getLikeCount = async (req, res) => {
  try {
    const shortId = req.params.id;

    const count = await ShortLike.countDocuments({
      short: shortId,
    });

    res.json({ count });
  } catch (error) {
    console.error('Get like count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ===============================
   CHECK IF USER LIKED
================================ */
exports.hasUserLiked = async (req, res) => {
  try {
    const shortId = req.params.id;
    const userId = req.user._id;

    const liked = await ShortLike.exists({
      short: shortId,
      user: userId,
    });

    res.json({ liked: !!liked });
  } catch (error) {
    console.error('Check user liked error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
/* ===============================
   GET ALL SHORTS
================================ */
exports.getAllShorts = async (req, res) => {
  try {
    const shorts = await require('../models/Short')
      .find()
      .sort({ createdAt: -1 });

    res.json(shorts);
  } catch (error) {
    console.error('Get shorts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
