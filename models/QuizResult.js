const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    zone: {
      type: String,
      required: true,
    },

    userId: {
      type: String, // still string (Option 1)
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
     office: {
  type: String,
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
