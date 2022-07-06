const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  code: Number,
  img: String,
  stock: Number,
  active: Boolean,
  timestamp: String,
});

const Product = mongoose.model("Product", productSchema);

async function getAll() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    return "Hubo un error al obtener los productos";
  }
}

module.exports = {
  getAll,
};
