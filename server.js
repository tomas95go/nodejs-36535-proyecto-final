const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (request, response) => {
  response.send("Hola!");
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
