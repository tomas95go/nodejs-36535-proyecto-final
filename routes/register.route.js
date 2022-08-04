const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer();
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const registerRouter = express.Router();

registerRouter.post("/", upload.single("avatar"), userController.register);

module.exports = registerRouter;
