const logger = require(`${__dirname}/winston.helper`);
function checkRole(request, response, next) {
  const isAdmin = true;
  if (!isAdmin) {
    logger.log(
      "warn",
      `Operación: ${request.method} en ruta ${request.originalUrl} no autorizada`
    );
    return response.status(401).json({
      error: -1,
      message: `Operación: ${request.method} en ruta ${request.originalUrl} no autorizada`,
    });
  }
  next();
}

module.exports = { checkRole };
