const jwt = require("jsonwebtoken");

function generateToken(user) {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        user,
      },
      jwtSecretKey
    );
    return token;
  } catch (error) {
    throw `Hubo un error al generar el token JWT`;
  }
}

function verify(request, response, next) {
  try {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const requestToken = request.header(tokenHeaderKey);
    const verified = jwt.verify(requestToken, jwtSecretKey);
    if (verified) {
      return next();
    } else {
      return response.status(401).send({
        message: "Hubo un error con sus credenciales, vuelva a iniciar sesión",
      });
    }
  } catch (error) {
    throw `Hubo un error al verificar el token JWT ${error}`;
  }
}

module.exports = {
  generateToken,
  verify,
};
