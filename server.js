const express = require("express");
const path = require("path");
require("dotenv").config();

const productsRouter = require(`${__dirname}/routes/products.route`);
const cartRouter = require(`${__dirname}/routes/cart.route`);
const routeHelper = require(`${__dirname}/helpers/route.helper`);
const database = require(path.join(__dirname, "/config"));

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
app.use(routeHelper.checkRoute);

database.connect();

app.listen(PORT, () => {
  console.log(
    `App running on port: ${PORT} with DB Engine: ${process.env.DB_ENGINE}. URL: http://localhost:${PORT}`
  );
});
