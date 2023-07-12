"use strict";

// 서버 실행 코드
const app = require("../app");
const PORT = 80;

app.listen(PORT, () => {
  console.log("서버 가동... " + "포트번호: " + PORT);
});
