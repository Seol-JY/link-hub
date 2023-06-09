const UserModel = require("../model/User");
const PostModel = require("../model/Post");

const User = {
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

const Post = {
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
