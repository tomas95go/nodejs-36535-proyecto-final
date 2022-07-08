const { getFirestore } = require("firebase-admin/firestore");

function getFirebaseApp() {
  const db = getFirestore();
  return db;
}

async function getAll() {
  try {
    const db = getFirebaseApp();
    const productsRef = db.collection("products");
    const productsSnapshot = await productsRef.get();
    const products = [];
    productsSnapshot.forEach((product) => {
      products.push(product.data());
    });
    return products;
  } catch (error) {
    throw "Hubo un error al obtener los productos";
  }
}

async function getOne(id) {
  try {
    const db = getFirebaseApp();

    const product = db.collection("products").doc(id.toString()).get();

    return product;
  } catch (error) {
    throw "Hubo un error al borrar el producto";
  }
}

async function addOne(newProduct) {
  try {
    const db = getFirebaseApp();

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

    const productDocument = db.collection("products").doc(id.toString());

    const addedProduct = await productDocument.set({
      id,
      name,
      description,
      price,
      code,
      img,
      stock,
      active,
      timestamp,
    });

    return addedProduct;
  } catch (error) {
    return "Hubo un error al agregar un nuevo producto";
  }
}

async function updateOne(id, newProduct) {
  try {
    const db = getFirebaseApp();

    const { name, description, price, code, img, stock } = newProduct;

    const productDocument = db.collection("products").doc(id.toString());

    const updatedProduct = await productDocument.update({
      name,
      description,
      price,
      code,
      img,
      stock,
    });

    return updatedProduct;
  } catch (error) {
    throw "Hubo un error al actualizar el producto";
  }
}

async function deleteOne(id) {
  try {
    const db = getFirebaseApp();

    const productDocument = db.collection("products").doc(id.toString());

    const updatedProduct = await productDocument.update({
      active: false,
    });

    return updatedProduct;
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
