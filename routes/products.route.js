const express = require("express");
const path = require("path");
const productsController = require("../controllers/products.controller");
const adminHelper = require("../helpers/admin.helper");
const isLoggedIn = require(path.join(__dirname, "..", "helpers/auth.helper"));

const productsRouter = express.Router();

productsRouter.use(isLoggedIn);
//get all - admin/user
productsRouter.get("/", productsController.getAll);
//get one - admin/user
productsRouter.get("/:id", productsController.getOne);
//post - admin
productsRouter.post("/", adminHelper.checkRole, productsController.addMany);
//put - admin
productsRouter.put("/:id", adminHelper.checkRole, productsController.updateOne);
//delete - admin
productsRouter.delete(
  "/:id",
  adminHelper.checkRole,
  productsController.deleteOne
);

module.exports = productsRouter;
