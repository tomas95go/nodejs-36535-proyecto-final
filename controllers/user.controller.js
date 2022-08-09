const path = require("path");
const productsModel = require(path.join(__dirname, "..", "models/users.model"));
const messageHelper = require(path.join(
  __dirname,
  "..",
  "helpers/messages.helper"
));

async function register(request, response) {
  try {
    const newUser = request.body;
    const isAlreadyRegistered = await productsModel.findByEmail(newUser.email);
    if (isAlreadyRegistered) {
      return response.status(404).json({
        message: `El mail: ${newUser.email} ya está en uso`,
      });
    }
    const registeredUser = await productsModel.register(
      newUser,
      "my_avatar_url"
    );
    const { email, avatar, name, age, address, phone } = registeredUser;
    await messageHelper.sendEmail(
      "Nuevo registro",
      "Gracias por registrarte",
      `<div>
          <h1>Alerta</h1>
          <h2>Un usuario se ha registrado con los siguientes datos:</h2>
            <ul>
                <li>Email: ${email}</li>
                <li>Avatar: <img src="${avatar}" alt="avatar" /></li>
                <li>Nombre: ${name}</li>
                <li>Edad: ${age}</li>
                <li>Dirección: ${address}</li>
                <li>Número de teléfono: ${phone}</li>
            </ul>
          </div>`
    );
    response.status(200).json({
      message: "Nuevo usuario registrado con éxito",
      registeredUser,
    });
  } catch (error) {
    response.status(404).json({
      message: `Ocurrió un error al registrar el nuevo usuario ${error}`,
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
    const userFound = await productsModel.findByEmail(user.email);
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
