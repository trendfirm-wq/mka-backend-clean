const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');

/**
 * POST /api/quizzes/submit
 * Body:
 * {
 *   quizId,
 *   answers: [0,2,1,3],
 *   correctAnswers: [0,1,1,3]
 * }
 */
router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, answers, correctAnswers } = req.body;

    if (!quizId || !answers || !correctAnswers) {
      return res.status(400).json({ message: 'Invalid submission' });
    }

    let score = 0;

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) score++;
    });

    const totalQuestions = correctAnswers.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const result = await QuizResult.create({
      userId: req.user.id,
      quizId,
      score,
      totalQuestions,
      percentage,
      answers,
    });

    res.json({
      message: 'Quiz submitted successfully',
      score,
      totalQuestions,
      percentage,
      resultId: result._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
});

module.exports = router;
