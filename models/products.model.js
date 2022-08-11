const path = require("path");

const Product = require(path.join(
  __dirname,
  "..",
  "schemas/product.mongo.schema"
));

const cloudinaryHelper = require(path.join(
  __dirname,
  "..",
  `helpers/cloudinary.helper`
));

async function getAll() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw "Hubo un error al obtener los productos";
  }
}

async function getOne(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw "Hubo un error al obtener el producto";
  }
}

async function addOne(newProduct) {
  try {
    const { name, description, price, category, img, stock } = newProduct;

    const imgCloudinary = await cloudinaryHelper.uploadImage(img);

    const product = new Product({
      name,
      description,
      price,
      category,
      img: imgCloudinary,
      stock,
      active: true,
    });

    product.save();

    return product;
  } catch (error) {
    throw "Hubo un error al crear el producto";
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
    throw "Hubo un error al actualizar el producto";
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
    throw "Hubo un error al borrar el producto";
  }
}

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
