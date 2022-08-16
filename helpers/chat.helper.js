const path = require("path");

const chatController = require(path.join(
  __dirname,
  "..",
  "controllers/chat.controller"
));

async function handleCustomerMessage(io, room, message, chatId) {
  try {
    await chatController.saveUserMessage(message, chatId);
    io.to(room).emit("new-customer-message-ui", message);
  } catch (error) {
    io.to(room).emit("new-customer-message-ui", {
      error,
    });
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
