const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String, // image URL or path
      required: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    content: {
      type: String, // full article (optional for now)
    },

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model('News', newsSchema);
