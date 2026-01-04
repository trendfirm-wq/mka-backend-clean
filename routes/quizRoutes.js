const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

/* ================= POST TA‘LIM QUIZ ================= */
router.post('/submit', auth, async (req, res) => {
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
      quizType: 'talim',
      userId: req.user.id,
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

    // ✅ FIXED: notification is USER-SCOPED
    await Notification.create({
      userId: req.user.id,
      title: '📢 Quiz Submitted',
      message: 'You have successfully submitted the Ta‘lim quiz.',
      quizType: 'talim',
    });

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
router.get('/results', auth, async (req, res) => {
  try {
    const results = await QuizResult.find({
      quizType: 'talim',
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

/* ================= POST TARB IYYAT QUIZ ================= */
router.post('/tarbiyyat/submit', auth, async (req, res) => {
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
      userId: req.user.id,
      quizId,
      name,
      region,
      zone,
      office,
      score,
      totalQuestions,
      percentage,
      answers,
    });

    // ✅ FIXED
    await Notification.create({
      userId: req.user.id,
      title: '📢 Quiz Submitted',
      message: 'You have successfully submitted the Tarbiyyat quiz.',
      quizType: 'tarbiyyat',
    });

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
router.get('/tarbiyyat/results', auth, async (req, res) => {
  try {
    const results = await QuizResult.find({
      quizType: 'tarbiyyat',
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

module.exports = router;
