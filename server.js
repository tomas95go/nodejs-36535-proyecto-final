const express = require("express");
const path = require("path");
require("dotenv").config();

const productsRouter = require(`${__dirname}/routes/products.route`);
const cartsRouter = require(`${__dirname}/routes/carts.route`);
const registerRouter = require(`${__dirname}/routes/register.route`);
const loginRouter = require(`${__dirname}/routes/login.route`);
const logoutRouter = require(`${__dirname}/routes/logout.route`);
const routeHelper = require(`${__dirname}/helpers/route.helper`);
const database = require(path.join(__dirname, "/config"));

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);
app.use(routeHelper.checkRoute);

database.connect();

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
