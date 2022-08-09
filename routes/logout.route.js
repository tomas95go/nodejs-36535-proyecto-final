const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));

const logoutRouter = express.Router();

logoutRouter.post("/", userController.logout);

module.exports = logoutRouter;
