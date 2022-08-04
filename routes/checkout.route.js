const express = require("express");
const path = require("path");
const isLoggedIn = require(path.join(__dirname, "..", "helpers/auth.helper"));

const checkoutRouter = express.Router();
const cartController = require(path.join(
  __dirname,
  "..",
  "/controllers/cart.controller"
));

checkoutRouter.use(isLoggedIn);
checkoutRouter.post("/:id_cart", cartController.checkout);

module.exports = checkoutRouter;
