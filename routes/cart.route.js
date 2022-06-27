const express = require("express");
const cartController = require("../controllers/cart.controller");

const cartRouter = express.Router();

//post - admin/user - new cart
cartRouter.post("/", cartController.add);
//delete - admin/user - delete cart
cartRouter.delete("/:id", cartController.deleteOne);
//get all - admin/user - get all products from cart
//cartRouter.get("/:id/productos");
//post - admin/user - add product to cart
//cartRouter.post("/:id/productos");
//delete - admin/user - delete product from cart
//cartRouter.post("/:id/productos/:id_prod");

module.exports = cartRouter;
