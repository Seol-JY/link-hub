const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

const app = express();

const whitelist = ["http://localhost:3000", "https://linkhub.seol.pro"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // 옵션을 추가한 CORS 미들웨어 추가

app.use(bodyParser.json());
app.use(cookieParser());

// 세션 설정 초기화
app.use(
  session({
    secret: "seol",
    resave: true,
    saveUninitialized: false,
  })
);

// 라우팅 정보를 별도로 관리
app.use("/api", routes);

module.exports = app;
