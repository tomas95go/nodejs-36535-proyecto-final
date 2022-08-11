const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: String,
    products: [],
    active: Boolean,
    address: String
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;