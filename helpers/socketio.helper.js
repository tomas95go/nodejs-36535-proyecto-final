const path = require("path");
const { Server } = require("socket.io");

const server = require(path.join(__dirname, "/server.helper"));

const io = new Server(server);

module.exports = io;
