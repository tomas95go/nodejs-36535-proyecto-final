const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const usersSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    avatar: String,
    name: String,
    age: Number,
    address: String,
    phone: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", usersSchema);

async function register(newUser, userAvatarURL) {
  try {
    const { email, password, name, age, address, phone } = newUser;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      password: encryptedPassword,
      avatar: userAvatarURL,
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
    throw "Hubo un error al obtener usuario";
  }
}

async function findById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw "Hubo un error al obtener usuario";
  }
}

module.exports = {
  register,
  findByEmail,
  findById,
};
