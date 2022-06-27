const express = require("express");
const albumsControllers = require("../controllers/products.controller");

const albumsRouter = express.Router();

//get all - admin/user
albumsRouter.get("/", albumsControllers.getAll);
//get one - admin/user
//post - admin
//put - admin
//delete - admin

module.exports = albumsRouter;
