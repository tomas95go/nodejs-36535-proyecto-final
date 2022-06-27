function checkRole(request, response, next) {
  const isAdmin = false;
  if (!isAdmin) {
    return response.status(401).json({
      error: -1,
      message: `Operación: ${request.method} no autorizada`,
    });
  }
  next();
}

module.exports = { checkRole };
