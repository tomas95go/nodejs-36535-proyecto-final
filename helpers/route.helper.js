function checkRoute(request, response) {
  response.status(401).json({
    error: -2,
    message: `Operación: ${request.method} en ruta ${request.originalUrl} no implementada`,
  });
}

module.exports = { checkRoute };
