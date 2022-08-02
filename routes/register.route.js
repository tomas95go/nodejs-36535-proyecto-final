const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const registerRouter = express.Router();

registerRouter.post("/", userController.register);

module.exports = registerRouter;
