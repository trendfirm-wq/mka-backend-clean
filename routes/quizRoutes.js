const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

/* ================= POST TA‘LIM QUIZ ================= */
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
      quizType: 'talim',          // ✅ FIXED
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

    console.log('✅ TA‘LIM QUIZ SAVED:', result._id);

    res.json({
      message: 'Quiz submitted successfully',
      result,
    });
  } catch (err) {
    console.error('❌ TA‘LIM QUIZ ERROR:', err);
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
});

/* ================= GET TA‘LIM RESULTS ================= */
router.get('/results', async (req, res) => {
  try {
    const results = await QuizResult.find({
      quizType: 'talim',          // ✅ CRITICAL FIX
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error('❌ FETCH TA‘LIM RESULTS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

/* ================= POST TARB IYYAT QUIZ ================= */
router.post('/tarbiyyat/submit', async (req, res) => {
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
      quizType: 'tarbiyyat',
      quizId,
      name,
      region,
      zone,
      office,
      userId: 'test-user',
      score,
      totalQuestions,
      percentage,
      answers,
    });

    console.log('✅ TARB IYYAT QUIZ SAVED:', result._id);

    res.json({
      message: 'Tarbiyyat quiz submitted successfully',
      result,
    });
  } catch (err) {
    console.error('❌ TARB IYYAT QUIZ ERROR:', err);
    res.status(500).json({ message: 'Failed to submit Tarbiyyat quiz' });
  }
});

/* ================= GET TARB IYYAT RESULTS ================= */
router.get('/tarbiyyat/results', async (req, res) => {
  try {
    const results = await QuizResult.find({
      quizType: 'tarbiyyat',
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error('❌ FETCH TARB IYYAT RESULTS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch Tarbiyyat results' });
  }
});

module.exports = router;
