const path = require("path");

const User = require(path.join(__dirname, "..", "schemas/user.mongo.schema"));

const bcryptHelper = require(path.join(
  __dirname,
  "..",
  "helpers/bcrypt.helper"
));
const cloudinaryHelper = require(path.join(
  __dirname,
  "..",
  `helpers/cloudinary.helper`
));

async function register(newUser) {
  try {
    const { email, password, avatar, name, age, address, phone } = newUser;

    const encryptedPassword = await bcryptHelper.encryptPassword(password);

    const avatarCloudinary = await cloudinaryHelper.uploadImage(avatar);

    const user = new User({
      email,
      password: encryptedPassword,
      avatar: avatarCloudinary,
      name,
      age,
      address,
      phone,
      active: true,
    });

    const registeredUser = await user.save();

    return registeredUser;
  } catch (error) {
    throw "Hubo un error al registrar el nuevo usuario";
  }
}

async function findByEmail(email) {
  try {
    const user = await User.findOne({
      email: email,
    });
    return user;
  } catch (error) {
    throw "Hubo un error al obtener usuario por email";
  }
}

async function checkPrivileges(email) {
  try {
    const user = await User.findOne({
      email: email,
      admin: true,
    });
    return user;
  } catch (error) {
    throw "Hubo un error al obtener usuario por email";
  }
}

async function findById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw "Hubo un error al obtener usuario por id";
  }
}

async function authenticate(password, hash) {
  try {
    const isMatch = await bcryptHelper.comparePassword(password, hash);
    return isMatch;
  } catch (error) {
    throw "Hubo un error al validar las credenciales del usuario";
  }
}

module.exports = {
  register,
  findByEmail,
  findById,
  authenticate,
  checkPrivileges,
};
