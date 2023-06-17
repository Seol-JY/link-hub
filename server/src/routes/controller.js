const UserModel = require("../model/User");
const PostModel = require("../model/Post");

// 사용자 관련 controller
const User = {
  // 로그인
  login: async (req, res) => {
    const { email, password } = req.body;
    UserModel.getUserInfo(email, password)
      .then((data) => {
        req.session.userId = data.id;
        res.json({ success: true, message: "Login successful" });
      })
      .catch((reson) => {
        if (reson === "Invalid") {
          res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        } else {
          console.error(reson);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      });
  },

  // 회원가입
  register: (req, res) => {
    const { email, username, password } = req.body;
    UserModel.setUserInfo(email, username, password)
      .then((data) => {
        res.json({ success: true, message: "Registration successful" });
      })
      .catch((reson) => {
        if (reson === "duplicate email") {
          res.status(409).json({ success: false, message: reson });
        } else if (reson === "duplicate username") {
          res.status(409).json({ success: false, message: reson });
        } else {
          console.error(reson);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      });
  },

  // 세션 유효성 검사
  validate: (req, res) => {
    if (req.session.userId) {
      UserModel.getUserInfoWithId(req.session.userId)
        .then((data) => {
          res.json({ success: true, message: "validate success", data });
        })
        .catch((reson) => {
          console.error(reson);
          if (reson === "Invalid") {
            res.status(404).json({ success: false, message: reson });
          } else {
            res
              .status(500)
              .json({ success: false, message: "Internal server error" });
          }
        });
    } else {
      res.json({ success: false, message: "validate fail" });
    }
  },

  // 로그아웃
  logout: (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        res.json({ success: true, message: "Logout successful" });
      }
    });
  },
};

// 게시글 관련 controller
const Post = {
  // 북마크 게시글 저장
  savePost: (req, res) => {
    PostModel.createPost(req)
      .then((data) => {
        res.json({ success: true, message: "create success", data });
      })
      .catch((reson) => {
        console.error(reson);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  },
  // 북마크 게시글 상세 조회
  getPost: (req, res) => {
    PostModel.getPost(req)
      .then((data) => {
        res.json(data);
      })
      .catch((reson) => {
        if (reson === "No Exist") {
          res.status(404).json({ success: false, message: reson });
        } else {
          console.error(reson);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      });
  },

  // 북마크 게시글 목록 검색
  getPostWithSearch: (req, res) => {
    PostModel.getPostWithSearch(req)
      .then((data) => {
        res.json(data);
      })
      .catch((reson) => {
        console.error(reson);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  },

  // 북마크 게시글 목록 사용자로 검색
  getPostWithUser: (req, res) => {
    PostModel.getPostWithUser(req)
      .then((data) => {
        res.json(data); // TODO: 해결
      })
      .catch((reson) => {
        console.error(reson);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  },

  // 인기순 북마크 게시글 목록 조회
  getTrend: (req, res) => {
    PostModel.getTrend(req)
      .then((data) => {
        res.json(data);
      })
      .catch((reson) => {
        console.error(reson);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  },

  // 최근 순 북마크 게시글 목록 조회
  getRecent: (req, res) => {
    PostModel.getRecent(req)
      .then((data) => {
        res.json(data);
      })
      .catch((reson) => {
        console.error(reson);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  },
};

module.exports = {
  User,
  Post,
};
