const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

router.post('/submit', async (req, res) => {
  try {
    const { quizId, answers, correctAnswers } = req.body;

    if (
      !quizId ||
      !Array.isArray(answers) ||
      !Array.isArray(correctAnswers)
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
      userId: 'test-user', // ✅ NOW VALID
      quizId,
      score,
      totalQuestions,
      percentage,
      answers,
    });

    console.log('✅ QUIZ SAVED:', result._id);

    res.json({
      message: 'Quiz submitted successfully',
      score,
      totalQuestions,
      percentage,
      resultId: result._id,
    });
  } catch (err) {
    console.error('❌ QUIZ SAVE ERROR:', err);
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
});

module.exports = router;
