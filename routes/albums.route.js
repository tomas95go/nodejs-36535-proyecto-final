const express = require("express");
const albumsControllers = require("../controllers/products.controller");

const albumsRouter = express.Router();

//get all - admin/user
albumsRouter.get("/", albumsControllers.getAll);
//get one - admin/user
albumsRouter.get("/:id", albumsControllers.getOne);
//post - admin
albumsRouter.post("/", albumsControllers.add);
//put - admin
albumsRouter.put("/:id", albumsControllers.update);
//delete - admin

module.exports = albumsRouter;
