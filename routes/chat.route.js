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
chatRouter.get("/create/:user", chatController.createChat);
chatRouter.get("/send/message/:user", chatController.sendUserMessage);
chatRouter.get(
  "/send/message/:administrator",
  chatController.sendAdministratorMessage
);
chatRouter.get("/terminate/:chat_id/:user", chatController.terminateChatByUser);
chatRouter.get(
  "/terminate/:chat_id/:admnistrator",
  chatController.terminateChatByAdministrator
);

module.exports = chatRouter;
