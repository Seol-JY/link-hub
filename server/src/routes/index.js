const multer = require("multer");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const controller = require("./controller");

// 이미지를 저장할 디렉토리 설정
const upload = multer({ dest: "uploads/" });

router.post("/login", controller.User.login);
router.post("/register", controller.User.register);
router.get("/validate", controller.User.validate);
router.post("/logout", controller.User.logout);

router.post(
  "/post",
  authenticate,
  upload.single("image"),
  controller.Post.savePost
);

router.get("/post", controller.Post.getPost);
router.get("/search", controller.Post.getPostWithSearch);
router.get("/search/user", controller.Post.getPostWithUser);

router.get("/recent", controller.Post.getRecent);
router.get("/trend", controller.Post.getTrend);

module.exports = router;
