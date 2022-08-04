const logger = require(`${__dirname}/winston.helper`);
function isLoggedIn(request, response, next) {
  try {
    const isAuthenticated = request.isAuthenticated();
    if (!isAuthenticated) {
      logger.log(
        "warn",
        `Operación: ${request.method} en ruta ${request.originalUrl} no autorizada por falta de credenciales`
      );
      return response.status(401).send({
        message:
          "No está autorizado para realizar esta operación. Por favor, iniciar sesión.",
      });
    }
    next();
  } catch (error) {
    logger.log(
      "error",
      `Operación: ${request.method} en ruta ${request.originalUrl} no autorizada por falta de credenciales`
    );
    return response.status(404).send({
      message: "Ocurrió un error al validar la sesión.",
    });
  }
}

module.exports = isLoggedIn;
