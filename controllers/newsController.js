const News = require('../models/News');

/**
 * GET ALL NEWS
 * Returns all news with:
 * - total likes
 * - whether current user liked each post
 */
exports.getAllNews = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    const newsList = await News.find().sort({ createdAt: -1 });

    const formatted = newsList.map(item => ({
      _id: item._id,
      title: item.title,
      image: item.image,
      excerpt: item.excerpt,
      createdAt: item.createdAt,
      likes: item.likes,
      liked: userId ? item.likedBy.includes(userId) : false,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Fetch news error:', err);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

/**
 * TOGGLE LIKE / UNLIKE
 * User can like only once
 */
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const newsId = req.params.id;

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const alreadyLiked = news.likedBy.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      news.likedBy = news.likedBy.filter(
        id => id.toString() !== userId
      );
      news.likes = Math.max(0, news.likes - 1);
    } else {
      // LIKE
      news.likedBy.push(userId);
      news.likes += 1;
    }

    await news.save();

    res.json({
      likes: news.likes,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.error('Toggle like error:', err);
    res.status(500).json({ message: 'Failed to update like' });
  }
};
