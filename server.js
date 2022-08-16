const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = require(path.join(__dirname, "/app"));
const server = http.createServer(app);
const io = new Server(server);

app.set("socket", io);

const database = require(path.join(__dirname, "/config"));
const PORT = process.env.PORT || 8080;

database.connect();

const { socketInit, validateJWT } = require(path.join(
  __dirname,
  "helpers/socketio.helper"
));

io.use(validateJWT);

io.on("connection", socketInit);

server.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
