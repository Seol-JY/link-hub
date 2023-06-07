const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const controller = require("./controller");

router.post("/login", controller.User.login);
router.post("/register", controller.User.register);
router.get("/validate", authenticate, controller.User.validate);
router.post("/logout", controller.User.logout);

module.exports = router;
