const express = require("express");
const path = require("path");

const productsController = require(path.join(
  __dirname,
  "..",
  "controllers/products.controller"
));

const jwtHelper = require(path.join(__dirname, "..", `helpers/jwt.helper`));
const adminHelper = require(path.join(__dirname, "..", "helpers/admin.helper"));

const productsRouter = express.Router();

productsRouter.use(jwtHelper.verify);

productsRouter.get("/", productsController.getAll);
productsRouter.get("/categoria/:category", productsController.getAllByCategory);
productsRouter.get("/:id", productsController.getOne);
productsRouter.post("/", productsController.addOne);
productsRouter.put("/:id", productsController.updateOne);
productsRouter.delete("/:id", productsController.deleteOne);

module.exports = productsRouter;
