const path = require("path");
const jwtHelper = require(path.join(__dirname, "jwt.helper"));

const socketInit = async (socket) => {
  const room = socket.handshake.query.room;
  const chatId = socket.handshake.query["chat-id"];
  socket.join(room);
  socket.on("new-customer-message", (msg) => {
    //chatHelper.handleCustomerMessage(io, room, msg, chatId);
    console.log(msg);
  });
  socket.on("new-administrator-message", (msg) => {
    chatHelper.handleAdministratorMessage(io, room, msg, chatId);
  });
};

const validateJWT = async (socket, next) => {
  const jwt = socket.handshake.headers["jwt"];
  const isJWTValid = jwtHelper.socketIOVerify(jwt);
  if (isJWTValid) {
    next();
  } else {
    next(new Error("Hubo un error con sus credenciales, inicie sesión"));
  }
};

module.exports = { socketInit, validateJWT };
