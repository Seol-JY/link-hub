const db = require("../config/db");

const User = {
  getUserInfo: async (email, password) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ? AND password = ?";
      db.query(query, [email, password], (err, data) => {
        if (err) reject(err);
        if (data.length === 0) reject("Invalid");
        resolve(data[0]);
      });
    });
  },

  setUserInfo: async (email, username, password) => {
    return new Promise((resolve, reject) => {
      // 이메일 중복 여부 확인
      const query1 = "SELECT * FROM users WHERE email = ?";
      db.query(query1, [email], (err, data) => {
        if (err) reject(err);
        if (data.length > 0) reject("duplicate email");
        else {
          // 닉네임 중복 여부 확인
          const query2 = "SELECT * FROM users WHERE username = ?";
          db.query(query2, [username], (err, data) => {
            if (err) reject(err);
            if (data.length > 0) reject("duplicate username");
            else {
              // 등록
              const query3 =
                "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
              db.query(query3, [username, password, email], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
              });
            }
          });
        }
      });
    });
  },
};

module.exports = User;
