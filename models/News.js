const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    caption: String,
    videoKey: String,

    image: {
      type: String, // Cloudinary image URL
    },

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
