const jwt = require("jsonwebtoken");

function generateToken(user) {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: "1h" });
    return token;
  } catch (error) {
    throw `Hubo un error al generar el token JWT`;
  }
}

function verify(request, response, next) {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const authorizationHeader = request.headers["authorization"];
    const requestToken =
      authorizationHeader && authorizationHeader.split(" ")[1];
    jwt.verify(requestToken, jwtSecretKey, (error, user) => {
      if (error) {
        return response.status(401).send({
          message: "Hubo un error con sus credenciales, inicie sesión",
        });
      }
      request.user = user;
      return next();
    });
  } catch (error) {
    return response.status(401).send({
      message: "Hubo un error con sus credenciales, inicie sesión",
    });
  }
}

module.exports = {
  generateToken,
  verify,
};
