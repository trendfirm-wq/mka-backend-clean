const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
      type: [Number], // indexes of selected answers
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizResult', QuizResultSchema);
