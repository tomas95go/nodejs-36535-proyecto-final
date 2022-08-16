const path = require("path");

const Chat = require(path.join(__dirname, "..", "schemas/chat.mongo.schema"));

async function getAllChats(email) {
  try {
    const chats = await Chat.find({
      emitter: email,
    }).exec();
    return chats;
  } catch (error) {
    throw "Hubo un error al recuperar los chats del usuario";
  }
}

async function createChat(user, subject) {
  try {
    const nextRoomNumber = await getNextRoomNumber();
    const room = `room-${nextRoomNumber}`;

    const chat = new Chat({
      emitter: user,
      receiver: "sistema@ecommerce.com",
      subject,
      room: room,
      status: "ongoing",
      active: true,
    });

    await chat.save();

    return chat;
  } catch (error) {
    throw "Hubo un error al crear la sala de chat";
  }
}

async function sendUserMessage() {}

async function sendAdministratorMessage() {}

async function terminateChatByUser() {}

async function terminateChatByAdministrator() {}

async function getNextRoomNumber() {
  try {
    const nextRoomNumber = await Chat.find().countDocuments({}).exec();
    return nextRoomNumber ? nextRoomNumber : 1;
  } catch (error) {
    throw "No se pudo recuperar el número de chats";
  }
}

module.exports = {
  getAllChats,
  createChat,
  sendUserMessage,
  sendAdministratorMessage,
  terminateChatByUser,
  terminateChatByAdministrator,
};
