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

async function register(newUser) {
  try {
    const { email, password, avatar, name, age, address, phone } = newUser;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      password: encryptedPassword,
      avatar,
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

module.exports = {
  register,
};
