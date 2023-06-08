"use strict";
const app = require("../app");
const PORT = 8080;

app.listen(PORT, () => {
  console.log("서버 가동... " + "포트번호: " + PORT);
});
