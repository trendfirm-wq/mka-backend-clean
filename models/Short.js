const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  body: String,
  author: String,
  createdAt: Number,
});

const ShortSchema = new mongoose.Schema(
  {
    videoKey: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
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
