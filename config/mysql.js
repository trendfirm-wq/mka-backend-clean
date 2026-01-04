const mysql = require('mysql2/promise');

let pool;

async function connectMySQL() {
  try {
    if (!process.env.MYSQL_PUBLIC_URL) {
      throw new Error('MYSQL_PUBLIC_URL not set');
    }

    pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL, {
      waitForConnections: true,
      connectionLimit: 10,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await pool.query('SELECT 1');
    console.log('✅ MySQL connected (Railway)');
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
