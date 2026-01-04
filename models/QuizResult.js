const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // ✅ CHANGE HERE
      required: true,
    },

    quizId: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    answers: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizResult', QuizResultSchema);
