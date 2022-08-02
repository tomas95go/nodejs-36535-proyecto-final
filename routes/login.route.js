const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const loginRouter = express.Router();

loginRouter.get("/", userController.login);

module.exports = loginRouter;
