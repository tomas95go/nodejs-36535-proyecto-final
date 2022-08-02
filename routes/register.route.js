const express = require("express");
const registerRouter = express.Router();

registerRouter.get("/", (request, response) => {
  response.status(200).json({
    message: "Register router",
  });
});

module.exports = registerRouter;
