const path = require("path");

const chatController = require(path.join(
  __dirname,
  "..",
  "controllers/chat.controller"
));

async function handleCustomerMessage(io, room, message, chatId) {
  try {
    const { user, text } = message;
    const newCustomerMessage = {
      user,
      message: text,
    };
    await chatController.saveUserMessage(newCustomerMessage, chatId);
    io.to(room).emit("new-customer-message-ui", message);
  } catch (error) {
    io.to(room).emit("new-customer-message-ui", {
      error,
    });
  }
}

async function handleAdministratorMessage(io, room, message, chatId) {
  try {
    const { user, text } = message;
    const newAdministratorMessage = {
      user,
      message: text,
    };
    await chatController.saveAdministratorMessage(
      newAdministratorMessage,
      chatId
    );
    io.to(room).emit("new-administrator-message-ui", message);
  } catch (error) {
    io.to(room).emit("new-administrator-message-ui", {
      error,
    });
  }
}

module.exports = {
  handleCustomerMessage,
  handleAdministratorMessage,
};
