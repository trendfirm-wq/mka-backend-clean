const express = require('express');
const ForumQuestion = require('../models/ForumQuestion');
const Short = require('../models/Short');
const Question = require('../models/Question'); // forum

const router = express.Router();

/* GET all questions */
router.get('/', async (req, res) => {
  try {
    const questions = await ForumQuestion.find().sort({
      createdAt: -1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load forum' });
  }
});

/* POST new question */
router.post('/', async (req, res) => {
  try {
    const question = await ForumQuestion.create(req.body);
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post question' });
  }
});

/* POST answer */
router.post('/:id/answer', async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: 'Question not found' });

    question.answers.push(req.body);
    await question.save();

    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post answer' });
  }
});
/* UPDATE question (author only) */
router.put('/:id', async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: 'Question not found' });

    // ⚠️ frontend already restricts UI
    question.title = req.body.title;
    question.body = req.body.body;

    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update question' });
  }
});
router.post('/:id/answer', async (req, res) => {
  const { body, author, createdAt } = req.body;

  // 1️⃣ Try forum question
  let doc = await Question.findById(req.params.id);

  // 2️⃣ If not found, try short
  if (!doc) {
    doc = await Short.findById(req.params.id);
  }

  if (!doc) {
    return res.status(404).json({ message: 'Item not found' });
  }

  doc.answers.unshift({ body, author, createdAt });
  await doc.save();

  // 🔥 return FULL updated object
  res.json(doc);
});

module.exports = router;
