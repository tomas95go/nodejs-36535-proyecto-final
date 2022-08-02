const express = require("express");
const loginRouter = express.Router();

loginRouter.get("/", (request, response) => {
  response.status(200).json({
    message: "Login router",
  });
});

module.exports = loginRouter;
