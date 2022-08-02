const express = require("express");
const logoutRouter = express.Router();

logoutRouter.get("/", (request, response) => {
  response.status(200).json({
    message: "Logout router",
  });
});

module.exports = logoutRouter;
