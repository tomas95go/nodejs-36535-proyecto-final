const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const http = require("http");
const cluster = require("cluster");
const cpuQuantity = require("os").cpus().length;
require("dotenv").config();

const passportHelper = require(`${__dirname}/helpers/passport.helper`);
const logger = require(`${__dirname}/helpers/winston.helper`);
const productsRouter = require(`${__dirname}/routes/products.route`);
const cartsRouter = require(`${__dirname}/routes/carts.route`);
const registerRouter = require(`${__dirname}/routes/register.route`);
const loginRouter = require(`${__dirname}/routes/login.route`);
const logoutRouter = require(`${__dirname}/routes/logout.route`);
const routeHelper = require(`${__dirname}/helpers/route.helper`);
const checkoutRouter = require(`${__dirname}/routes/checkout.route`);
const profileRouter = require(`${__dirname}/routes/profile.route`);
const database = require(path.join(__dirname, "/config"));

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
app.use(express.static("public"));
app.use(express.json());
passportHelper.initialize(passport);
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
app.use((request, response, next) => {
  logger.log("info", `Petición recibida: ${request.method} - ${request.path}`);
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/profile", profileRouter);
app.use(routeHelper.checkRoute);

database.connect();

if (cluster.isPrimary && process.env.CLUSTER_MODE === true) {
  console.log("Inicializando en modo cluster");
  for (let i = 0; i < cpuQuantity; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker: ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT, () => {
    console.log(`App running on port: ${PORT}. URL: http://localhost:${PORT}`);
  });
}
