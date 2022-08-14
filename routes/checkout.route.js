const express = require("express");
const path = require("path");

const checkoutRouter = express.Router();

const cartController = require(path.join(
  __dirname,
  "..",
  "/controllers/cart.controller"
));

const jwtHelper = require(path.join(__dirname, "..", `helpers/jwt.helper`));
const validatorHelper = require(path.join(
  __dirname,
  "..",
  "helpers/validator.helper"
));

checkoutRouter.post(
  "/",
  jwtHelper.verify,
  //validatorHelper.validateOrderSchema,
  cartController.checkout
);

module.exports = checkoutRouter;
