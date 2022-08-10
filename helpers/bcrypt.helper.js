const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword(password) {
  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  } catch (error) {
    throw "Hubo un error al encriptar la contraseña";
  }
}

async function comparePassword(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw "Hubo un error al comparar las contraseñas";
  }
}

module.exports = { encryptPassword, comparePassword };
