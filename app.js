const express = require("express");
require("dotenv").config();

const productsRouter = require(`${__dirname}/routes/products.route`);
const cartsRouter = require(`${__dirname}/routes/carts.route`);
const registerRouter = require(`${__dirname}/routes/register.route`);
const loginRouter = require(`${__dirname}/routes/login.route`);
const logoutRouter = require(`${__dirname}/routes/logout.route`);
const checkoutRouter = require(`${__dirname}/routes/checkout.route`);
const profileRouter = require(`${__dirname}/routes/profile.route`);
const chatRouter = require(`${__dirname}/routes/chat.route`);

const routeHelper = require(`${__dirname}/helpers/route.helper`);

const app = express();

app.use(express.json());
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/profile", profileRouter);
app.use("/api/chat", chatRouter);
app.use(routeHelper.checkRoute);

module.exports = app;
