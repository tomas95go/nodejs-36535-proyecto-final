const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const isLoggedIn = require(path.join(__dirname, "..", "helpers/auth.helper"));

const profileRouter = express.Router();

profileRouter.use(isLoggedIn);

profileRouter.get("/:email", userController.getProfile);

module.exports = profileRouter;
