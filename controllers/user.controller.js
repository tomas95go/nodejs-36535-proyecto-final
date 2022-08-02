const path = require("path");
const usersDao = require(path.join(__dirname, "..", "daos/users.dao"));

async function register(request, response) {
  try {
    const newUser = request.body;
    const registeredUser = await usersDao.register(newUser);
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
  response.status(200).json({
    message: "Login router",
  });
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
