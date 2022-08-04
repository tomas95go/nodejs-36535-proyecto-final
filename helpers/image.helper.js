const path = require("path");
const directoryHelper = require(path.join(__dirname, "directory.helper"));

async function store(img, user) {
  try {
    const directoryExists = await directoryHelper.createDirectory(user);
    if (directoryExists) {
    }
  } catch (error) {
    throw `Hubo un error al guarda el avatar del usuario`;
  }
}

module.exports = {
  store,
};
