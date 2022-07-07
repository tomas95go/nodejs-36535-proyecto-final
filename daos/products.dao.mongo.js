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

async function updateOne(id, newProduct) {
  try {
    const { name, description, price, code, img, stock } = newProduct;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        code,
        img,
        stock,
      },
      {
        new: true,
      }
    );
    return updatedProduct;
  } catch (error) {
    return "Hubo un error al actualizar el producto";
  }
}

async function deleteOne(id) {
  try {
    const softDeletedProduct = await Product.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        new: true,
      }
    );
    return softDeletedProduct;
  } catch (error) {
    return "Hubo un error al borrar el producto";
  }
}

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
