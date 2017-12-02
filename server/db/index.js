const { Pool } = require('pg');

const pool = new Pool({
  user: 'student',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
