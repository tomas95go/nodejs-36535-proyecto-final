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

async function createChat(request, response) {
  try {
    const { user } = request.user;
    const createdChat = await chatModel.createChat(user, request.body.subject);
    const { _id, emitter, receiver, subject, room, status } = createdChat;
    const chat = {
      _id,
      emitter,
      receiver,
      subject,
      room,
      status,
    };
    response.status(201).json({
      message: `Se ha creado la sala de chat con éxito`,
      chat,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al crear la sala de chat",
    });
  }
}

async function saveUserMessage(message, chatId) {
  try {
    const storedMessage = await chatModel.saveUserMessage(chatId, message);
    return storedMessage;
  } catch (error) {
    throw "Hubo un error al guardar el mensaje del cliente";
  }
}

async function saveAdministratorMessage(message, chatId) {
  try {
    const storedMessage = await chatModel.saveAdministratorMessage(
      chatId,
      message
    );
    return storedMessage;
  } catch (error) {
    throw "Hubo un error al guardar el mensaje del administrador";
  }
}

module.exports = {
  getAllChats,
  createChat,
  saveUserMessage,
  saveAdministratorMessage,
};
