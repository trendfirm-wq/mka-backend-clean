require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Short = require('../models/Short');

const shortsData = [
  {
    videoKey: 'short1.mp4',
    caption: 'Ijtema moments 🇬🇭',
  },
  {
    videoKey: 'short2.mp4',
    caption: 'Brotherhood & discipline',
  },
  {
    videoKey: 'short3.mp4',
    caption: 'Khuddam in action',
  },
];

async function seedShorts() {
  try {
    await connectDB();

    // prevent duplicates
    await Short.deleteMany({});

    await Short.insertMany(shortsData);

    console.log('✅ Shorts seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedShorts();
