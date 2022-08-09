const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));

const profileRouter = express.Router();

profileRouter.get("/:email", userController.getProfile);

module.exports = profileRouter;
