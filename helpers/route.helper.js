const logger = require(`${__dirname}/winston.helper`);
function checkRoute(request, response) {
  logger.log(
    "warn",
    `Operación: ${request.method} en ruta ${request.path} no implementada`
  );
  response.status(401).json({
    error: -2,
    message: `Operación: ${request.method} en ruta ${request.originalUrl} no implementada`,
  });
}

module.exports = { checkRoute };
