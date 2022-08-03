const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const passportHelper = require(`${__dirname}/helpers/passport.helper`);
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
passportHelper.initialize(passport);
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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
