const path = require("path");

const usersModel = require(path.join(__dirname, "..", "models/users.model"));
const cartsModel = require(path.join(__dirname, "..", `models/carts.model`));

const messageHelper = require(path.join(
  __dirname,
  "..",
  "helpers/messages.helper"
));
const jwtHelper = require(path.join(__dirname, "..", `helpers/jwt.helper`));

async function register(request, response) {
  try {
    const newUser = request.body;
    const isAlreadyRegistered = await usersModel.findByEmail(newUser.email);
    if (isAlreadyRegistered) {
      return response.status(404).json({
        message: `El mail: ${newUser.email} ya está en uso`,
      });
    }
    const registeredUser = await usersModel.register(newUser);
    const { email, avatar, name, age, address, phone } = registeredUser;
    const cart = await cartsModel.addOne(registeredUser);
    await messageHelper.sendNewUserMessage(registeredUser);
    response.status(201).json({
      message: "Nuevo usuario registrado con éxito",
      user: {
        email,
        avatar,
        name,
        age,
        address,
        phone,
      },
      cart,
    });
  } catch (error) {
    response.status(404).json({
      message: `Ocurrió un error al registrar el nuevo usuario`,
    });
  }
}

async function login(request, response) {
  try {
    const user = request.body;
    const userExists = await usersModel.findByEmail(user.email);
    if (!userExists) {
      return response.status(401).json({
        message: "Usuario o contraseña no válida",
      });
    }
    const credentialsMatch = await usersModel.authenticate(
      user.password,
      userExists.password
    );
    if (!credentialsMatch) {
      return response.status(401).json({
        message: "Usuario o contraseña no válida",
      });
    }
    const token = jwtHelper.generateToken(request.body.email);
    response.status(200).json({
      message: "Usuario autenticado con éxito",
      token,
    });
  } catch (error) {
    response.status(401).json({
      message: "Usuario o contraseña no válida",
    });
  }
}

function logout(request, response) {
  try {
    response.status(200).json({
      message: "Sesión terminada con éxito",
    });
  } catch (error) {
    response.status(401).json({
      message: "Error al realizar el logout",
    });
  }
}

async function getProfile(request, response) {
  try {
    const user = request.params;
    const userFound = await usersModel.findByEmail(user.email);
    const { email, avatar, name, age, address, phone } = userFound;
    response.status(200).json({
      message: "Perfil del usuario obtenido con éxito",
      profile: {
        email,
        avatar,
        name,
        age,
        address,
        phone,
      },
    });
  } catch (error) {
    response.status(404).json({
      message: `Ocurrió un error al obtener el perfil del usuario ${error}`,
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
