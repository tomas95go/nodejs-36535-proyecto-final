const path = require("path");
const jwtHelper = require(path.join(__dirname, "jwt.helper"));

const validateJWT = async (socket, next) => {
  const jwt = socket.handshake.headers["jwt"];
  const isJWTValid = jwtHelper.socketIOVerify(jwt);
  if (isJWTValid) {
    next();
  } else {
    next(new Error("Hubo un error con sus credenciales, inicie sesión"));
  }
};

module.exports = { validateJWT };
