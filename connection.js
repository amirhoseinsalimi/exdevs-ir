const mysql = require('mysql');
const {
  DB_HOST: host,
  DB_PORT: port,
  DB_NAME: database,
  DB_USERNAME: user,
  DB_PASSWORD: password,
} = require('./config');

const pool = mysql.createPool({
  connectionLimit: 10,
  port,
  host,
  user,
  password,
  database,
});

module.exports = pool;
