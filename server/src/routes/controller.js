const UserModel = require("../model/User");

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
    res.json({ success: true, message: "validate success" });
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

module.exports = {
  User,
};
