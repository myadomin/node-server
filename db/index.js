// 修改root密码  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

const query = (sql, callback) => {
  pool.getConnection((err,connection) => {
    connection.query(sql, (err,rows) => {
      callback(err,rows);
      connection.release();
    });
});
}

module.exports = {
  query
}