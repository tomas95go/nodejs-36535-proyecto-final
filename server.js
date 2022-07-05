const express = require("express");
const albumsRouter = require(`${__dirname}/routes/albums.route`);
const cartRouter = require(`${__dirname}/routes/cart.route`);
const routeHelper = require(`${__dirname}/helpers/route.helper`);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/productos", albumsRouter);
app.use("/api/carrito", cartRouter);
app.use(routeHelper.checkRoute);

app.listen(PORT, () => {
  console.log(
    `App running on port: ${PORT} with DB Engine: ${process.env.DB_ENGINE}. URL: http://localhost:${PORT}`
  );
});
