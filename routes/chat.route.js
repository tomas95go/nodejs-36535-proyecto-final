const path = require("path");
const express = require("express");

const chatRouter = express.Router();

const chatController = require(path.join(
  __dirname,
  "..",
  "controllers/chat.controller"
));

const jwtHelper = require(path.join(__dirname, "..", "helpers/jwt.helper"));

chatRouter.use(jwtHelper.verify);

chatRouter.get("/:user", chatController.getAllChats);
chatRouter.post("/create", chatController.createChat);

module.exports = chatRouter;
