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

    const productDocument = db.collection("products").doc(id);

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

module.exports = {
  getAll,
  addOne,
};
