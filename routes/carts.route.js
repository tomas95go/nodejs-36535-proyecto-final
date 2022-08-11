const express = require("express");
const path = require("path");
const cartController = require("../controllers/cart.controller");

const jwtHelper = require(path.join(__dirname, "..", `helpers/jwt.helper`));

const cartRouter = express.Router();

cartRouter.use(jwtHelper.verify);

cartRouter.post("/", cartController.add);
cartRouter.delete("/:id", cartController.deleteOne);
cartRouter.get("/:id/productos", cartController.getAllProducts);
cartRouter.post("/:id/productos", cartController.addManyProducts);
cartRouter.delete(
  "/:id_cart/productos/:id_prod",
  cartController.deleteOneProduct
);

module.exports = cartRouter;
