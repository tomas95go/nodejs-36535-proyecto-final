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

module.exports = {
  createDirectory,
};
