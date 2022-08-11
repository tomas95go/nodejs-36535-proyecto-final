const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers/user.controller"
));
const validatorHelper = require(path.join(
  __dirname,
  "..",
  "helpers/validator.helper"
));
const registerRouter = express.Router();

registerRouter.post(
  "/",
  validatorHelper.validateUserSchema,
  userController.register
);

module.exports = registerRouter;
