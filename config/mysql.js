const mysql = require('mysql2/promise');

let pool;

async function connectMySQL() {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
    });

    await pool.query('SELECT 1');
    console.log('✅ MySQL connected (quiz database)');
  } catch (err) {
    console.error('❌ MySQL connection failed', err);
    process.exit(1);
  }
}

function getMySQL() {
  if (!pool) {
    throw new Error('MySQL not connected yet');
  }
  return pool;
}

module.exports = {
  connectMySQL,
  getMySQL,
};
