require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const News = require('../models/News');

const seedNews = async () => {
  try {
    await connectDB();

    // Clear existing news (safe for dev)
    await News.deleteMany();

    const newsData = [
      {
        title: 'National Ijtema 2025 Successfully Held',
        image: 'https://picsum.photos/800/500?random=1',
        excerpt:
          'Majlis Khuddam-ul-Ahmadiyya Ghana successfully organized the 2025 National Ijtema with participation from all regions.',
        content:
          'The 2025 National Ijtema brought together Khuddam from across Ghana for spiritual training, brotherhood, and leadership development.',
      },
      {
        title: 'Weekly Ta‘lim Quiz Launched Nationwide',
        image: 'https://picsum.photos/800/500?random=2',
        excerpt:
          'Khuddam across the country participated in the newly launched weekly Ta‘lim quiz initiative.',
        content:
          'The Ta‘lim Department launched a nationwide quiz to strengthen Islamic knowledge and promote healthy competition.',
      },
      {
        title: 'Fireside Conversations Strengthen Brotherhood',
        image: 'https://picsum.photos/800/500?random=3',
        excerpt:
          'Fireside Conversations continue to inspire meaningful discussions and unity among Khuddam.',
        content:
          'These informal but impactful sessions allow Khuddam to share experiences, ask questions, and build brotherhood.',
      },
    ];

    await News.insertMany(newsData);

    console.log('✅ News seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedNews();
