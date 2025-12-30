const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  body: String,
  author: String,
  createdAt: { type: Number, default: Date.now },
});

const ForumQuestionSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  createdAt: { type: Number, default: Date.now },
  answers: [AnswerSchema],
});

module.exports = mongoose.model(
  'ForumQuestion',
  ForumQuestionSchema
);
