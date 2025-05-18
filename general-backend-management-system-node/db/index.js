const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'heythere',
  database: 'back_system',
});

module.exports = db;