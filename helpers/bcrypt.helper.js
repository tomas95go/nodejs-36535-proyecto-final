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

module.exports = { encryptPassword };
