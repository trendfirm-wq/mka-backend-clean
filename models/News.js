const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    // NEWS TITLE
    title: {
      type: String,
      required: true,
    },

    // FULL NEWS ARTICLE
    content: {
      type: String,
      required: true,
    },

    // CLOUDINARY public_id or image URL
    image: {
      type: String,
      required: true,
    },

    // WHO POSTED IT (optional)
    author: {
      type: String,
      default: "anonymous",
    },

    // OPTIONAL: Likes system (keep if you want likes on news)
    likesCount: {
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
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
