// 세션을 통한 인가작업을 수행하는 미들웨어
const authenticate = (req, res, next) => {
  if (req.session.userId) {
    // 세션이 유효하다면 다음 작업수행
    next();
  } else {
    // 세션이 유효하지 않다면 상태 반환
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = authenticate;
