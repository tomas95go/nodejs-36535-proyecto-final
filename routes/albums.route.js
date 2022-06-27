const express = require("express");
const albumsControllers = require("../controllers/products.controller");
const adminHelper = require("../helpers/admin.helper");

const albumsRouter = express.Router();

//get all - admin/user
albumsRouter.get("/", albumsControllers.getAll);
//get one - admin/user
albumsRouter.get("/:id", albumsControllers.getOne);
//post - admin
albumsRouter.post("/", adminHelper.checkRole, albumsControllers.addMany);
//put - admin
albumsRouter.put("/:id", adminHelper.checkRole, albumsControllers.updateOne);
//delete - admin
albumsRouter.delete("/:id", adminHelper.checkRole, albumsControllers.deleteOne);

module.exports = albumsRouter;
