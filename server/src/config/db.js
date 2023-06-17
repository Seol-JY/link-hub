// 데이터베이스 설정 정보
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abcd123@",
  database: "linkhubdb",
});

db.connect();
module.exports = db;
