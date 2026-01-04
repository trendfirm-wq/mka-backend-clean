const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

/* ================= POST SUBMIT QUIZ ================= */
router.post('/submit', async (req, res) => {
  try {
    const {
      quizId,
      answers,
      correctAnswers,
      name,
      region,
      zone,
      office,
    } = req.body;

    if (
      !quizId ||
      !Array.isArray(answers) ||
      !Array.isArray(correctAnswers) ||
      !name ||
      !region ||
      !zone ||
      !office
    ) {
      return res.status(400).json({ message: 'Invalid submission' });
    }

    let score = 0;
    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) score++;
    });

    const totalQuestions = correctAnswers.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const result = await QuizResult.create({
      userId: 'test-user',
      name,
      region,
      zone,
      office,
      quizId,
      score,
      totalQuestions,
      percentage,
      answers,
    });

    console.log('✅ QUIZ SAVED:', result._id);

    res.json({
      message: 'Quiz submitted successfully',
      result,
    });
  } catch (err) {
    console.error('❌ QUIZ SAVE ERROR:', err);
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
});

/* ================= GET QUIZ RESULTS ================= */
router.get('/results', async (req, res) => {
  try {
    const results = await QuizResult.find()
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error('❌ FETCH RESULTS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

module.exports = router;
