const express = require("express");
const path = require("path");
const passport = require("passport");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const loginRouter = express.Router();

loginRouter.post("/", passport.authenticate("local"), userController.login);

module.exports = loginRouter;
