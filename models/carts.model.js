const path = require("path");

const Cart = require(path.join(__dirname, "..", "schemas/cart.mongo.schema"));

async function addOne(user) {
  try {
    const { email, address } = user;

    const cart = new Cart({
      user: email,
      active: true,
      address,
    });

    await cart.save();

    return cart;
  } catch (error) {
    throw "Hubo un error al crear el carrito";
  }
}

async function getOne(email) {
  try {
    const cart = await Cart.findOne({
      user: email,
      active: true,
    });
    return cart;
  } catch (error) {
    throw "Hubo un error al encontrar el carrito";
  }
}

async function deleteOne(id) {
  try {
    const softDeletedCart = await Cart.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        new: true,
      }
    );
    return softDeletedCart;
  } catch (error) {
    throw "Hubo un error al borrar el carrito";
  }
}

async function addManyProducts(id, products) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $push: { products: { $each: products } } },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al agregar porductos al carrito";
  }
}

async function deleteOneProduct(cart_id, product_id) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cart_id,
      { $pull: { products: { id: product_id } } },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al eliminar porductos del carrito";
  }
}

module.exports = {
  addOne,
  getOne,
  deleteOne,
  addManyProducts,
  deleteOneProduct,
};
