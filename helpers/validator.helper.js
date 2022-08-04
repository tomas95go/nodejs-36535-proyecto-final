const path = require("path");
const usersDao = require(path.join(__dirname, "..", "daos/users.dao"));
async function validateUser(request, response, next) {
  try {
    const newUser = request.body;
    const isAlreadyRegistered = await usersDao.findByEmail(newUser.email);
    if (isAlreadyRegistered) {
      return response.status(404).json({
        message: `El mail: ${newUser.email} ya está en uso`,
      });
    }
    next();
  } catch (error) {
    throw "Hubo un error al validar el usuario";
  }
}

module.exports = {
  validateUser,
};
