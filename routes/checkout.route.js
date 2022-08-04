const express = require("express");
const path = require("path");

const checkoutRouter = express.Router();
const cartController = require(path.join(
  __dirname,
  "..",
  "/controllers/cart.controller"
));

checkoutRouter.post("/:id_cart", cartController.checkout);

module.exports = checkoutRouter;
