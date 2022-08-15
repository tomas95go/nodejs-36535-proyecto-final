const path = require("path");

async function getAllChats(request, response) {}

async function createChat(request, response) {}

async function sendUserMessage(request, response) {}

async function sendAdministratorMessage(request, response) {}

async function terminateChatByUser(request, response) {}

async function terminateChatByAdministrator(request, response) {}

module.exports = {
  getAllChats,
  createChat,
  sendUserMessage,
  sendAdministratorMessage,
  terminateChatByUser,
  terminateChatByAdministrator,
};
