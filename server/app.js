const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "seol",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api", routes);

module.exports = app;
