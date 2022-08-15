const path = require("path");

const Chat = require(path.join(__dirname, "..", "schemas/chat.mongo.schema"));

async function getAllChats() {}

async function createChat() {}

async function sendUserMessage() {}

async function sendAdministratorMessage() {}

async function terminateChatByUser() {}

async function terminateChatByAdministrator() {}

async function getNextRoomNumber() {}

module.exports = {
  getAllChats,
  createChat,
  sendUserMessage,
  sendAdministratorMessage,
  terminateChatByUser,
  terminateChatByAdministrator,
};
