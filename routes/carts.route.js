const express = require("express");
const path = require("path");
const cartController = require("../controllers/cart.controller");

const jwtHelper = require(path.join(__dirname, "..", `helpers/jwt.helper`));

const cartRouter = express.Router();

cartRouter.use(jwtHelper.verify);

cartRouter.get("/:id/productos", cartController.getAllProducts);
cartRouter.post("/:id/productos", cartController.addOne);
cartRouter.put("/:id/productos/:id_producto", cartController.updateOne);
cartRouter.delete("/:id/productos/:id_producto", cartController.deleteOne);

module.exports = cartRouter;
