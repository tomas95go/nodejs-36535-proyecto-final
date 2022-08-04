const path = require("path");
const fileHelper = require(path.join(__dirname, "file.helper"));
const logger = require(`${__dirname}/winston.helper`);

async function store(img, user) {
  try {
    const directoryExists = await fileHelper.createDirectory(user);
    if (!directoryExists) {
      return false;
    }
    const avatarDirectoryExists = await fileHelper.save(user, img);
    if (!avatarDirectoryExists) {
      return false;
    }
    return true;
  } catch (error) {
    logger.log("error", `Hubo un error al guarda el avatar del usuario`);
    throw `Hubo un error al guarda el avatar del usuario`;
  }
}

async function getUserAvatarURL(user) {
  try {
    const userDirectory = await fileHelper.getUserRelativeDirectory(user);
    return userDirectory;
  } catch (error) {
    logger.log("error", `Hubo un error al obtener la carpeta del usuario`);
    throw `Hubo un error al obtener la carpeta del usuario`;
  }
}

module.exports = {
  store,
  getUserAvatarURL,
};
