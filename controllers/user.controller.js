const path = require("path");
const usersDao = require(path.join(__dirname, "..", "daos/users.dao"));
const imageHelper = require(path.join(__dirname, "..", "helpers/image.helper"));
const messageHelper = require(path.join(
  __dirname,
  "..",
  "helpers/messages.helper"
));
const logger = require(path.join(__dirname, "..", "helpers/winston.helper"));

async function register(request, response) {
  try {
    const newUser = request.body;
    const newUserAvatar = request.file;
    const isAlreadyRegistered = await usersDao.findByEmail(newUser.email);
    if (isAlreadyRegistered) {
      return response.status(404).json({
        message: `El mail: ${newUser.email} ya está en uso`,
      });
    }
    if (!process.env.PRODUCTION) {
      const imageExists = await imageHelper.store(newUserAvatar, newUser.email);
      if (imageExists) {
        const userAvatarURL = await imageHelper.getUserAvatarURL(newUser.email);
        const registeredUser = await usersDao.register(newUser, userAvatarURL);
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
      }
    } else {
      const registeredUser = await usersDao.register(newUser, "my_avatar_url");
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
    }
  } catch (error) {
    logger.log(
      "error",
      `Ocurrió un error al registrar el nuevo usuario ${error}`
    );
    response.status(404).json({
      message: `Ocurrió un error al registrar el nuevo usuario ${error}`,
    });
  }
}

function login(request, response) {
  try {
    request.session.save((err) => {
      if (err) {
        logger.log("error", `Hubo un error al guardar la sessio ${err}`);
        return response.status(404).json({
          message: "Hubo un error al guardar la session",
        });
      }

      response.status(200).json({
        message: "Usuario autenticado con éxito",
      });
    });
  } catch (error) {
    logger.log("error", `Usuario o contraseña no válida ${error}`);
    response.status(401).json({
      message: "Usuario o contraseña no válida",
    });
  }
}

function logout(request, response) {
  try {
    request.session.destroy(function (err) {
      if (err) {
        logger.log(
          "error",
          `Error al realizar al destruir la session ${error}`
        );
        return response.status(404).json({
          message: "Error al realizar al destruir la session",
        });
      }

      response.status(200).json({
        message: "Sesión terminada con éxito",
      });
    });
  } catch (error) {
    logger.log("error", `Error al realizar el logout ${error}`);
    response.status(401).json({
      message: "Error al realizar el logout",
    });
  }
}

async function getProfile(request, response) {
  try {
    const user = request.params;
    const userFound = await usersDao.findByEmail(user.email);
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
    logger.log(
      "error",
      `Ocurrió un error al obtener el perfil del usuario ${error}`
    );
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
