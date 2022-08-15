const path = require("path");

const server = require(path.join(__dirname, "helpers/server.helper"));

const database = require(path.join(__dirname, "/config"));
const PORT = process.env.PORT || 8080;

database.connect();

server.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
