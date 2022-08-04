const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const isLoggedIn = require(path.join(__dirname, "..", "helpers/auth.helper"));
const logoutRouter = express.Router();

logoutRouter.use(isLoggedIn);
logoutRouter.post("/", userController.logout);

module.exports = logoutRouter;
