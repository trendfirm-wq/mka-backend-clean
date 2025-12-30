const mongoose = require('mongoose');

const shortLikeSchema = new mongoose.Schema(
  {
    short: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Short',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🚫 Prevent duplicate likes (one like per user per short)
shortLikeSchema.index({ short: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('ShortLike', shortLikeSchema);
