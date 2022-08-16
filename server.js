const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = require(path.join(__dirname, "/app"));
const server = http.createServer(app);
const io = new Server(server);

const database = require(path.join(__dirname, "/config"));
const PORT = process.env.PORT || 8080;

database.connect();

const chatHelper = require(path.join(__dirname, "helpers/chat.helper"));
const jwtHelper = require(path.join(__dirname, "helpers/jwt.helper"));

io.use((socket, next) => {
  const jwt = socket.handshake.headers["jwt"];
  const isJWTValid = jwtHelper.socketIOVerify(jwt);
  if (isJWTValid) {
    next();
  } else {
    next(new Error("Hubo un error con sus credenciales, inicie sesión"));
  }
});

io.on("connection", (socket) => {
  const room = socket.handshake.query.room;
  const chatId = socket.handshake.query["chat-id"];
  socket.join(room);
  socket.on("new-customer-message", (msg) => {
    chatHelper.handleCustomerMessage(io, room, msg, chatId);
  });
  socket.on("new-administrator-message", (msg) => {
    chatHelper.handleAdministratorMessage(io, msg);
  });
});

server.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
