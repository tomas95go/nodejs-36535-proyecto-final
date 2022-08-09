function isLoggedIn(request, response, next) {
  try {
    const isAuthenticated = request.isAuthenticated();
    if (!isAuthenticated) {
      return response.status(401).send({
        message:
          "No está autorizado para realizar esta operación. Por favor, iniciar sesión.",
      });
    }
    next();
  } catch (error) {
    return response.status(404).send({
      message: "Ocurrió un error al validar la sesión.",
    });
  }
}

module.exports = isLoggedIn;
