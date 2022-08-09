const path = require("path");
const http = require("http");

const database = require(path.join(__dirname, "/config"));
const app = require(path.join(__dirname, "/app"));

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

database.connect();

server.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
