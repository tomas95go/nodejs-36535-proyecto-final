const path = require("path");
const usersDao = require(path.join(__dirname, "..", "daos/users.dao"));
const messageHelper = require(path.join(
  __dirname,
  "..",
  "helpers/messages.helper"
));

async function register(request, response) {
  try {
    const newUser = request.body;
    const registeredUser = await usersDao.register(newUser);
    const email = await messageHelper.sendEmail(
      newUser,
      "Nuevo registro",
      "Gracias por registrarte"
    );
    response.status(200).json({
      message: "Nuevo usuario registrado con éxito",
      registeredUser,
    });
  } catch (error) {
    response.status(404).json({
      message: "Ocurrió un error al registrar el nuevo usuario",
    });
  }
}

function login(request, response) {
  try {
    response.status(200).json({
      message: "Usuario autenticado con éxito",
    });
  } catch (error) {
    response.status(401).json({
      message: "Usuario o contraseña no válida",
    });
  }
}

function logout(request, response) {
  response.status(200).json({
    message: "Logout router",
  });
}

module.exports = {
  register,
  login,
  logout,
};
