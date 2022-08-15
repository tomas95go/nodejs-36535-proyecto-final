const path = require("path");

const chatModel = require(path.join(__dirname, "..", "models/chats.model"));

async function getAllChats(request, response) {
  try {
    const email = request.params.user;
    const chats = await chatModel.getAllChats(email);

    if (!chats.length) {
      return response.status(404).json({
        message: `El usuario: ${email} todavía no ha iniciado una conversación`,
      });
    }

    response.status(200).json({
      message: `Conversaciones de ${email} recuperadas con éxito`,
      chats,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al recuperar los chats del usuario",
    });
  }
}

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
