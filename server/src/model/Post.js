const db = require("../config/db");
const fs = require("fs");

const Post = {
  createPost: async (req) => {
    return new Promise((resolve, reject) => {
      const userId = req.session.userId;
      const data = JSON.parse(req.body.data);

      console.log(userId);
      console.log(data);

      // 북마크 등록
      const query1 =
        "INSERT INTO bookmark (users_id, title, description) VALUES (?, ?, ?)";
      db.query(
        query1,
        [userId, data.title, data.description],
        (err, results) => {
          if (err) reject(err);
          else {
            const bookmarkId = results.insertId;

            data.link.map((link, index) => {
              if (link.description !== "" && link.url !== "") {
                const query2 =
                  "INSERT INTO link (bookmark_id, description, link) VALUES (?, ?, ?)";
                db.query(
                  query2,
                  [bookmarkId, link.description, link.url],
                  (err, data) => {
                    if (err) reject(err);
                  }
                );
              }
            });

            const imageFilePath = req.file.path;
            // 이미지 파일을 읽어들임
            const image = fs.readFileSync(imageFilePath);

            // BLOB 형식으로 이미지를 데이터베이스에 저장
            const query3 =
              "INSERT INTO bookmark_image (bookmark_id, img) VALUES (?, ?)";

            db.query(query3, [bookmarkId, image], (error, results) => {
              if (err) reject(err);
              else {
                resolve(results[0]);
              }
            });
          }
        }
      );
    });
  },
};

module.exports = Post;
