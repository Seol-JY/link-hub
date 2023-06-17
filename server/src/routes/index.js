const multer = require("multer");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const controller = require("./controller");

// 이미지를 저장할 디렉토리 설정
const upload = multer({ dest: "uploads/" });

// 라우팅 정보
router.post("/login", controller.User.login); // 로그인
router.post("/register", controller.User.register); // 회원가입
router.get("/validate", controller.User.validate); // 세션 유효성
router.post("/logout", controller.User.logout); // 로그아웃

// 게시글 등록 (autheticate middleware를 통해 세션 유효성 확인, 이미지 업로드를 위한 middleware사용)
router.post(
  "/post",
  authenticate,
  upload.single("image"),
  controller.Post.savePost
);

router.get("/post", controller.Post.getPost); // 북마크 게시글 상세 내용 조회
router.get("/search", controller.Post.getPostWithSearch); // 검색
router.get("/search/user", controller.Post.getPostWithUser); // 사용자 이름으로 작성 게시글 목록 조회

router.get("/recent", controller.Post.getRecent); // 최근 발행 순 게시글 목록 조회
router.get("/trend", controller.Post.getTrend); // 조회수 기준 인기있는 순 게시글 목록 조회

module.exports = router;
