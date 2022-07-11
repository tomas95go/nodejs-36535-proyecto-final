const { getFirestore } = require("firebase-admin/firestore");

function getFirebaseApp() {
  const db = getFirestore();
  return db;
}

async function getOne() {}
async function addOne() {
  try {
    const db = getFirestore();
    const cart = {
      products: [],
      active: true,
      timestamp: new Date().toLocaleString("es-AR"),
    };
    const newCart = await db.collection("carts").doc().set(cart);
    return newCart;
  } catch (error) {
    throw "Hubo un error al agregar un nuevo carrito";
  }
}
async function deleteOne() {}
async function addManyProducts() {}
async function deleteOneProduct() {}

module.exports = {
  getOne,
  addOne,
  deleteOne,
  addManyProducts,
  deleteOneProduct,
};
