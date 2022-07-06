const express = require("express");
const productsController = require("../controllers/products.controller");
const adminHelper = require("../helpers/admin.helper");

const productsRouter = express.Router();

//get all - admin/user
productsRouter.get("/", productsController.getAll);
//get one - admin/user
productsRouter.get("/:id", productsController.getOne);
//post - admin
productsRouter.post("/", adminHelper.checkRole, productsController.addOne);
//put - admin
/*productsRouter.put("/:id", adminHelper.checkRole, productsController.updateOne);
//delete - admin
productsRouter.delete("/:id", adminHelper.checkRole, productsController.deleteOne);*/

module.exports = productsRouter;
