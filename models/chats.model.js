const path = require("path");

const Chat = require(path.join(__dirname, "..", "schemas/chat.mongo.schema"));

async function getAllChats(email) {
  try {
    const chats = await Chat.find({
      $or: [{ emitter: email }, { receiver: email }],
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

async function saveUserMessage(id, message) {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      {
        $push: { messages: message },
      },
      {
        new: true,
      }
    );
    return updatedChat;
  } catch (error) {
    throw "Hubo un error al guardar el mensaje del cliente";
  }
}

async function saveAdministratorMessage(id, message) {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      {
        $push: { messages: message },
      },
      {
        new: true,
      }
    );
    return updatedChat;
  } catch (error) {
    throw "Hubo un error al guardar el mensaje del administrador";
  }
}

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
  saveUserMessage,
  saveAdministratorMessage,
};
