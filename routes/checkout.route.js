const express = require("express");
const path = require("path");

const checkoutRouter = express.Router();

const cartController = require(path.join(
  __dirname,
  "..",
  "/controllers/cart.controller"
));

const jwtHelper = require(path.join(__dirname, "..", `helpers/jwt.helper`));

checkoutRouter.post("/:id", jwtHelper.verify, cartController.checkout);

module.exports = checkoutRouter;
