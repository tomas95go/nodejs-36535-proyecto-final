const { getFirestore, FieldValue } = require("firebase-admin/firestore");

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
async function deleteOne(id) {
  try {
    const db = getFirestore();
    const cartRef = db.collection("carts").doc(id);
    const cart = await cartRef.update({ active: false });
    return cart;
  } catch (error) {
    throw "Hubo un error al agregar un nuevo carrito";
  }
}
async function addManyProducts(id, products) {
  try {
    const db = getFirestore();
    const cartRef = db.collection("carts").doc(id);
    const updatedCart = await cartRef.update({
      products: FieldValue.arrayUnion(...products),
    });
    return updatedCart;
  } catch (error) {
    console.log(error);
    throw `Hubo un error al agregar productos al carrito`;
  }
}
async function deleteOneProduct() {}

module.exports = {
  getOne,
  addOne,
  deleteOne,
  addManyProducts,
  deleteOneProduct,
};
