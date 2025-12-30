const News = require('../models/News');

exports.toggleLike = async (req, res) => {
  try {
    const newsId = req.params.id;
    const userId = req.user._id.toString();

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const alreadyLiked = news.likedBy
      .map(id => id.toString())
      .includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      news.likedBy.pull(userId);
      news.likesCount = Math.max(0, news.likesCount - 1);
    } else {
      // LIKE
      news.likedBy.push(userId);
      news.likesCount += 1;
    }

    await news.save();

    console.log('LIKE HIT:', newsId, 'BY', userId);

    res.json({
      liked: !alreadyLiked,
      likesCount: news.likesCount,
    });
  } catch (err) {
    console.error('LIKE ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
