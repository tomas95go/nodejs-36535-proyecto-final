const express = require("express");
const albumsRouter = require(`${__dirname}/routes/albums.route`);
const cartRouter = require(`${__dirname}/routes/cart.route`);

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api/productos", albumsRouter);
app.use("/api/carrito", cartRouter);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
});
