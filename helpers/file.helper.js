const path = require("path");
const fs = require("fs");
const logger = require(`${__dirname}/winston.helper`);

async function createDirectory(user) {
  try {
    const userDirectory = path.join(
      __dirname,
      "..",
      `public/storage/users/${user}`
    );
    await fs.promises.mkdir(userDirectory);
    const directoryExists = fs.existsSync(`${userDirectory}`);
    return directoryExists;
  } catch (error) {
    logger.log("error", `Hubo un error al crear la carpeta del usuario`);
    throw `Hubo un error al crear la carpeta del usuario`;
  }
}

async function getUserDirectory(user) {
  try {
    const userDirectory = path.join(
      __dirname,
      "..",
      `public/storage/users/${user}/`
    );
    return userDirectory;
  } catch (error) {
    logger.log("error", `Hubo un error al obtener la carpeta del usuario`);
    throw `Hubo un error al obtener la carpeta del usuario`;
  }
}

async function getUserRelativeDirectory(user) {
  try {
    const userDirectory = await getUserDirectory(user);
    const userDirectoryContent = await fs.promises.readdir(userDirectory);
    const userRelativeDirectory = `${process.env.LOCAL_BASE_URL}/storage/users/${user}/${userDirectoryContent[0]}`;
    return userRelativeDirectory;
  } catch (error) {
    logger.log("error", `Hubo un error al obtener la carpeta del usuario`);
    throw `Hubo un error al obtener la carpeta del usuario`;
  }
}

async function save(user, img) {
  try {
    const userDirectory = await getUserDirectory(user);
    const userAvatarDirectory = `${userDirectory}/${img.originalname}`;
    await fs.promises.writeFile(userAvatarDirectory, img.buffer);
    const avatarDirectoryExists = fs.existsSync(`${userAvatarDirectory}`);
    return avatarDirectoryExists;
  } catch (error) {
    logger.log("error", `Hubo un error al crear un archivo`);
    throw `Hubo un error al crear un archivo`;
  }
}

module.exports = {
  getUserRelativeDirectory,
  createDirectory,
  save,
};
