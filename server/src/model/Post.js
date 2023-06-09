const { rejects } = require("assert");
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

            const query4 =
              "INSERT INTO bookmark_view (bookmark_id, view_count) VALUES (?, ?)";

            db.query(query4, [bookmarkId, 0], (error, results) => {
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
  getPost: async (req) => {
    return new Promise((resolve, reject) => {
      const { username, bookmarkId } = req.query;
      const sql = `
        SELECT bookmark.title, bookmark.description, users.username,
               link.id AS linkId, link.description AS linkDescription, link.link,
               bookmark_image.img, bookmark_view.view_count
        FROM users
        JOIN bookmark ON bookmark.users_id = users.id
        LEFT JOIN link ON link.bookmark_id = bookmark.id
        LEFT JOIN bookmark_image ON bookmark_image.bookmark_id = bookmark.id
        LEFT JOIN bookmark_view ON bookmark_view.bookmark_id = bookmark.id
        WHERE users.username = ? AND bookmark.id = ?
      `;

      db.query(sql, [username, bookmarkId], (err, results) => {
        if (err) {
          reject("server error");
        } else {
          if (results.length === 0) {
            reject("No Exist");
          } else {
            const post = {
              title: results[0].title,
              description: results[0].description,
              links: [],
              view_count: results[0].view_count,
              username: results[0].username,
              img: results[0].img ? results[0].img.toString("base64") : null,
            };

            // 연관된 link 정보를 배열에 추가
            for (let i = 0; i < results.length; i++) {
              if (results[i].linkId) {
                const link = {
                  linkDescription: results[i].linkDescription,
                  link: results[i].link,
                };
                post.links.push(link);
              }
            }

            // view_count 증가
            const incrementViewCountQuery = `UPDATE bookmark_view SET view_count = view_count + 1 WHERE bookmark_id = ?`;
            db.query(incrementViewCountQuery, [bookmarkId], (err, result) => {
              if (err) {
                console.error("Failed to increment view_count:", err);
              }
            });
            resolve(post);
          }
        }
      });
    });
  },
};

module.exports = Post;
