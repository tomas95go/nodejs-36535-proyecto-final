const express = require("express");
const path = require("path");

const productsController = require(path.join(
  __dirname,
  "..",
  "controllers/products.controller"
));

const adminHelper = require(path.join(__dirname, "..", "helpers/admin.helper"));

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.getOne);
productsRouter.post("/", productsController.addOne);
productsRouter.put("/:id", productsController.updateOne);
productsRouter.delete("/:id", productsController.deleteOne);

module.exports = productsRouter;
