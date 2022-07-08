const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [],
  active: Boolean,
  timestamp: String,
});

const Cart = mongoose.model("Cart", cartSchema);
function addOne() {
  try {
    const cart = new Cart({
      active: true,
      timestamp: new Date().toLocaleString("es-AR"),
    });

    cart.save();

    return cart;
  } catch (error) {
    throw "Hubo un error al crear el carrito";
  }
}

module.exports = {
  addOne,
};
