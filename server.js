require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db'); // MongoDB

// Routes
const newsRoutes = require('./routes/newsRoutes');
const forumRoutes = require('./routes/forumRoutes');
const liveRoutes = require('./routes/liveRoutes');
const adminShortsRoutes = require('./routes/adminShortsRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


const app = express();

/* ================= CONNECT DATABASE ================= */
connectDB(); // MongoDB Atlas

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

// Serve media files
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

/* ================= ROUTES ================= */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/news', newsRoutes);
app.use('/api/likes', require('./routes/likesRoutes'));
app.use('/api/forum', forumRoutes);
app.use('/api/shorts', require('./routes/shortsRoutes'));
app.use('/api/admin/shorts', adminShortsRoutes);
app.use('/api/comments', require('./routes/comments'));
app.use('/api/live', liveRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/mkaai', require('./routes/mkaAIRoutes'));


// ✅ QUIZ ROUTES (MongoDB)
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/admin/quizzes', require('./routes/adminQuizRoutes'));

/* ================= TEST ROUTE ================= */
app.get('/', (req, res) => {
  res.send('MKA Backend Running');
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
