function checkRole(request, response, next) {
  const isAdmin = true;
  if (!isAdmin) {
    return response.status(401).json({
      error: -1,
      message: `Operación: ${request.method} en ruta ${request.originalUrl} no autorizada`,
    });
  }
  next();
}

module.exports = { checkRole };
