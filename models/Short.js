const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  body: String,
  author: String,
  createdAt: Number,
});

const ShortSchema = new mongoose.Schema(
  {
    // 🔹 EXISTING (DO NOT REMOVE)
    videoKey: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    // 🔹 NEW: who uploaded it
    author: {
      type: String,
      required: true,
    },

    // 🔥 NEW: MODERATION STATUS
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    // ✅ COMMENTS (FORUM STYLE)
    answers: {
      type: [AnswerSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Short', ShortSchema);
