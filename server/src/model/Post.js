const { rejects } = require("assert");
const db = require("../config/db");
const fs = require("fs");

// 게시글의 데이터베이스 접근 관련 로직
const Post = {
  // 북마크 게시글 생성
  createPost: async (req) => {
    return new Promise((resolve, reject) => {
      const userId = req.session.userId;
      const data = JSON.parse(req.body.data);

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

            // 링크 item 등록
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

            // 북마크 게시글 조회수 초기화
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
    // 게시글 상세 조회
    return new Promise((resolve, reject) => {
      const { username, bookmarkId } = req.query;
      const sql = `
        SELECT bookmark.created_at, bookmark.title, bookmark.description, users.username,
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
            // 게시글이 존재하지 않는 경우
            reject("No Exist");
          } else {
            // 게시글이 존재하면 게시글 object 생성
            const post = {
              created_at: results[0].created_at,
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

  getPostWithSearch: async (req) => {
    // 게시글 검색 기능
    return new Promise((resolve, reject) => {
      const { q } = req.query;
      const sql = `
      SELECT bookmark.created_at, bookmark.title, bookmark.description, users.username,
             link.id AS linkId, link.description AS linkDescription,
             bookmark_image.img, bookmark.id As bookmarkId
      FROM users
      JOIN bookmark ON bookmark.users_id = users.id
      LEFT JOIN link ON link.bookmark_id = bookmark.id
      LEFT JOIN bookmark_image ON bookmark_image.bookmark_id = bookmark.id
      WHERE 
        bookmark.title LIKE CONCAT('%', ?, '%') 
        OR bookmark.description LIKE CONCAT('%', ?, '%') 
        OR users.username LIKE CONCAT('%', ?, '%') 
        OR link.description LIKE CONCAT('%', ?, '%')`;

      db.query(sql, [q, q, q, q], (err, results) => {
        if (err) {
          reject("server error");
        } else {
          const posts = [];

          for (let i = 0; i < results.length; i++) {
            const bookmarkId = results[i].bookmarkId;

            // 이미 해당 bookmarkId를 가진 post가 존재하는지 확인
            const existingPost = posts.find(
              (post) => post.bookmarkId === bookmarkId
            );

            if (existingPost) {
              // 이미 존재하는 post에 link 정보를 추가
              existingPost.links.push(results[i].linkDescription);
            } else {
              // 새로운 post를 생성하여 배열에 추가
              const post = {
                created_at: results[i].created_at,
                title: results[i].title,
                description: results[i].description,
                links: [results[i].linkDescription],
                username: results[i].username,
                img: results[i].img ? results[i].img.toString("base64") : null,
                bookmarkId: bookmarkId,
              };
              posts.push(post);
            }
          }

          resolve(posts);
        }
      });
    });
  },

  getPostWithUser: async (req) => {
    // 사용자명으로 게시글 목록을 가지고옴
    return new Promise((resolve, reject) => {
      const { q } = req.query;
      const sql = `
      SELECT bookmark.created_at, bookmark.title, bookmark.description, users.username,
             link.id AS linkId, link.description AS linkDescription,
             bookmark_image.img, bookmark.id As bookmarkId
      FROM users
      JOIN bookmark ON bookmark.users_id = users.id
      LEFT JOIN link ON link.bookmark_id = bookmark.id
      LEFT JOIN bookmark_image ON bookmark_image.bookmark_id = bookmark.id
      WHERE users.username = ?`;

      db.query(sql, [q], (err, results) => {
        if (err) {
          reject("server error");
        } else {
          const posts = [];

          for (let i = 0; i < results.length; i++) {
            const bookmarkId = results[i].bookmarkId;

            // 이미 해당 bookmarkId를 가진 post가 존재하는지 확인
            const existingPost = posts.find(
              (post) => post.bookmarkId === bookmarkId
            );

            if (existingPost) {
              // 이미 존재하는 post에 link 정보를 추가
              existingPost.links.push(results[i].linkDescription);
            } else {
              // 새로운 post를 생성하여 배열에 추가
              const post = {
                created_at: results[i].created_at,
                title: results[i].title,
                description: results[i].description,
                links: [results[i].linkDescription],
                username: results[i].username,
                img: results[i].img ? results[i].img.toString("base64") : null,
                bookmarkId: bookmarkId,
              };
              posts.push(post);
            }
          }

          resolve(posts);
        }
      });
    });
  },

  getRecent: async (req) => {
    // 날짜순 내림차순 정렬 게시글 목록 가져오기  (limit 제공)
    return new Promise((resolve, reject) => {
      const { limit } = req.query;
      const sql = `
      SELECT bookmark.created_at, bookmark.title, bookmark.description, users.username,
             bookmark_image.img, bookmark.id As bookmarkId, bookmark_view.view_count
      FROM users
      JOIN bookmark ON bookmark.users_id = users.id
      LEFT JOIN bookmark_image ON bookmark_image.bookmark_id = bookmark.id
      LEFT JOIN bookmark_view ON bookmark_view.bookmark_id = bookmark.id
      ORDER BY bookmark.created_at DESC ${limit !== undefined ? "LIMIT" : ""} ${
        limit !== undefined ? limit : ""
      };
      `;

      db.query(sql, (err, results) => {
        if (err) {
          reject("server error");
        } else {
          const posts = [];

          for (let i = 0; i < results.length; i++) {
            const bookmarkId = results[i].bookmarkId;

            // 새로운 post를 생성하여 배열에 추가
            const post = {
              created_at: results[i].created_at,
              title: results[i].title,
              description: results[i].description,
              username: results[i].username,
              img: results[i].img ? results[i].img.toString("base64") : null,
              bookmarkId: bookmarkId,
              view_count: results[i].view_count,
            };
            posts.push(post);
          }

          resolve(posts);
        }
      });
    });
  },

  getTrend: async (req) => {
    // 조회수순 오름차순 정렬 게시글 목록 가져오기  (limit 제공)
    return new Promise((resolve, reject) => {
      const { limit } = req.query;
      const sql = `
      SELECT bookmark.created_at, bookmark.title, bookmark.description, users.username,
             bookmark_image.img, bookmark.id As bookmarkId, bookmark_view.view_count
      FROM users
      JOIN bookmark ON bookmark.users_id = users.id
      LEFT JOIN bookmark_image ON bookmark_image.bookmark_id = bookmark.id
      LEFT JOIN bookmark_view ON bookmark_view.bookmark_id = bookmark.id
      ORDER BY bookmark_view.view_count DESC ${
        limit !== undefined ? "LIMIT" : ""
      } ${limit !== undefined ? limit : ""};
      `;

      db.query(sql, (err, results) => {
        if (err) {
          reject("server error");
        } else {
          const posts = [];

          for (let i = 0; i < results.length; i++) {
            const bookmarkId = results[i].bookmarkId;

            // 새로운 post를 생성하여 배열에 추가
            const post = {
              created_at: results[i].created_at,
              title: results[i].title,
              description: results[i].description,
              username: results[i].username,
              img: results[i].img ? results[i].img.toString("base64") : null,
              bookmarkId: bookmarkId,
              view_count: results[i].view_count,
            };
            posts.push(post);
          }

          resolve(posts);
        }
      });
    });
  },
};

module.exports = Post;
