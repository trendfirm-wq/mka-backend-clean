require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const newsRoutes = require('./routes/newsRoutes');
const forumRoutes = require('./routes/forumRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve media files (ADD THIS)
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/news', newsRoutes);
app.use('/api/likes', require('./routes/likesRoutes'));
app.use('/api/forum', forumRoutes);
app.use('/api/shorts', require('./routes/shortsRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('MKA Store Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
