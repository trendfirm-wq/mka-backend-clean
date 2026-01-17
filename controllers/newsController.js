const News = require('../models/News');

/* ============================================
   CREATE NEWS ARTICLE
   (POST /api/news)
============================================ */
exports.createNews = async (req, res) => {
  try {
    const { title, content, image, author } = req.body;

    if (!title || !content || !image) {
      return res.status(400).json({ message: "Title, content & image are required." });
    }

    const news = await News.create({
      title,
      content,
      image,
      author: author || "anonymous",
    });

    res.status(201).json(news);
  } catch (err) {
    console.error("CREATE NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to create news", error: err.message });
  }
};

/* ============================================
   GET ALL NEWS
   (GET /api/news)
============================================ */
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });

    const formatted = newsList.map(item => ({
      _id: item._id,
      title: item.title,
      content: item.content,
      image: item.image,
      author: item.author,
      createdAt: item.createdAt,
      likesCount: item.likesCount || 0,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("GET NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

/* ============================================
   GET SINGLE NEWS ARTICLE
   (GET /api/news/:id)
============================================ */
exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (err) {
    console.error("GET SINGLE NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch article" });
  }
};

/* ============================================
   LIKE / UNLIKE NEWS
   (POST /api/news/:id/like)
============================================ */
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const newsId = req.params.id;

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
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

    res.json({
      liked: !alreadyLiked,
      likesCount: news.likesCount,
    });
  } catch (err) {
    console.error("TOGGLE LIKE ERROR:", err);
    res.status(500).json({ message: "Failed to update like" });
  }
};
