const mongoose = require("mongoose");

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

module.exports = User;
