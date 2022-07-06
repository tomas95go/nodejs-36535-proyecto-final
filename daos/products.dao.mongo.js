const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: Number,
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

async function getOne(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    return "Hubo un error al obtener el producto";
  }
}

async function addOne(newProduct) {
  try {
    const {
      id,
      name,
      description,
      price,
      code,
      img,
      stock,
      active,
      timestamp,
    } = newProduct;

    const product = new Product({
      _id: id,
      name,
      description,
      price,
      code,
      img,
      stock,
      active,
      timestamp,
    });

    product.save();

    return product;
  } catch (error) {
    return "Hubo un error al crear el producto";
  }
}

module.exports = {
  getAll,
  getOne,
  addOne,
};
