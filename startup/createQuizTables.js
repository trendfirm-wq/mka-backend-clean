const db = require('../db');

async function createQuizTables() {
  // QUIZZES TABLE
  await db.query(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quiz_key VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      total_questions INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // QUIZ RESULTS TABLE
  await db.query(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quiz_id INT NOT NULL,
      user_id INT NOT NULL,
      score INT NOT NULL,
      total_questions INT NOT NULL,
      percentage DECIMAL(5,2) NOT NULL,
      taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (user_id),
      INDEX (quiz_id)
    )
  `);

  console.log('✅ Quiz tables ready');
}

module.exports = createQuizTables;
