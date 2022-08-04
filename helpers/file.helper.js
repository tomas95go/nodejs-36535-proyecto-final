const path = require("path");
const fs = require("fs");

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
    throw `Hubo un error al crear un archivo`;
  }
}

module.exports = {
  getUserDirectory,
  createDirectory,
  save,
};
