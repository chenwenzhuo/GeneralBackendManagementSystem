const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'heythere',
  database: 'back_system',
}).promise();

module.exports = db;