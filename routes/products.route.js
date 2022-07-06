const express = require("express");
const productsController = require("../controllers/products.controller");
const adminHelper = require("../helpers/admin.helper");

const albumsRouter = express.Router();

//get all - admin/user
albumsRouter.get("/", productsController.getAll);
//get one - admin/user
/*albumsRouter.get("/:id", productsController.getOne);
//post - admin
albumsRouter.post("/", adminHelper.checkRole, productsController.addMany);
//put - admin
albumsRouter.put("/:id", adminHelper.checkRole, productsController.updateOne);
//delete - admin
albumsRouter.delete("/:id", adminHelper.checkRole, productsController.deleteOne);*/

module.exports = albumsRouter;
