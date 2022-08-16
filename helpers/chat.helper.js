const path = require("path");

const chatController = require(path.join(
  __dirname,
  "..",
  "controllers/chat.controller"
));

async function handleCustomerMessage(io, message, chatId) {
  try {
    await chatController.saveUserMessage(message, chatId);
  } catch (error) {
    console.log(error);
  }
}

async function handleAdministratorMessage(io, message) {
  try {
    console.log(`handleCustomerMessage: ${message}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleCustomerMessage,
  handleAdministratorMessage,
};
