const express = require("express");
const cartController = require("../controllers/cart.controller");

const cartRouter = express.Router();

//post - admin/user - new cart
cartRouter.post("/", cartController.add);
//delete - admin/user - delete cart
cartRouter.delete("/:id", cartController.deleteOne);
//get all - admin/user - get all products from cart
cartRouter.get("/:id/productos", cartController.getAllProducts);
//post - admin/user - add product to cart
/*cartRouter.post("/:id/productos", cartController.addManyProducts);
//delete - admin/user - delete product from cart
cartRouter.delete(
  "/:id_cart/productos/:id_prod",
  cartController.deleteOneProduct
);*/

module.exports = cartRouter;
