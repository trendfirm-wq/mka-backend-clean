require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db'); // MongoDB
const { connectMySQL } = require('./config/mysql'); // MySQL
const createQuizTables = require('./startup/createQuizTables');

// Routes
const newsRoutes = require('./routes/newsRoutes');
const forumRoutes = require('./routes/forumRoutes');
const liveRoutes = require('./routes/liveRoutes');
const adminShortsRoutes = require('./routes/adminShortsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

/* ================= CONNECT DATABASES ================= */
connectDB();        // MongoDB
connectMySQL();     // MySQL (quiz DB)

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

/* ================= TEST ROUTE ================= */
app.get('/', (req, res) => {
  res.send('MKA Store Backend Running');
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await createQuizTables(); // uses MySQL
    console.log('✅ Quiz tables checked/created');
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.error('❌ Failed to create quiz tables', err);
  }
});
