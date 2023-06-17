const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

const app = express();

// cors 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
