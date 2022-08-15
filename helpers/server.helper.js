const path = require("path");
const http = require("http");

const app = require(path.join(__dirname, "..", "/app"));

const server = http.createServer(app);

module.exports = server;
