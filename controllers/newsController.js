const News = require('../models/News');

/**
 * GET ALL NEWS (PUBLIC)
 * Returns all news with like count
 */
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });

    const formatted = newsList.map(item => ({
      _id: item._id,
      title: item.title,
      caption: item.caption,
      image: item.image,
      videoKey: item.videoKey,
      createdAt: item.createdAt,
      likesCount: item.likesCount || 0,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('GET NEWS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

/**
 * TOGGLE LIKE / UNLIKE (PROTECTED)
 */
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const newsId = req.params.id;

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const alreadyLiked = news.likedBy
      .map(id => id.toString())
      .includes(userId);

    if (alreadyLiked) {
      news.likedBy.pull(userId);
      news.likesCount = Math.max(0, news.likesCount - 1);
    } else {
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
    console.error('TOGGLE LIKE ERROR:', err);
    res.status(500).json({ message: 'Failed to update like' });
  }
};
