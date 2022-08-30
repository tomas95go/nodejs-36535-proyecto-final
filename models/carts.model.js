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

async function getOneByIdAndEmail(id, user) {
  try {
    const cart = await Cart.findOne({ _id: id, user, active: true }).exec();
    return cart;
  } catch (error) {
    throw "Hubo un error al encontrar el carrito";
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

async function addOneProduct(id, product) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $push: {
          products: {
            _id: product,
            quantity: 1,
          },
        },
      },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al agregar el producto al carrito";
  }
}

async function increaseOneProductQuantity(id, product) {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: id, "products._id": product },
      {
        $inc: { "products.$.quantity": 1 },
      },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al incrementar la cantidad del producto";
  }
}

async function decreaseOneProductQuantity(id, product) {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: id, "products._id": product },
      {
        $inc: { "products.$.quantity": -1 },
      },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al incrementar la cantidad del producto";
  }
}

async function deleteOneProduct(id, product_id) {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: id },
      { $pull: { products: { _id: product_id } } },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al eliminar el producto del carrito";
  }
}

async function emptyCartProducts(id) {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: id },
      { $set: { products: [] } },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    throw "Hubo un error al vaciar los productos del carrito";
  }
}

module.exports = {
  addOne,
  getOne,
  getOneByIdAndEmail,
  deleteOne,
  addOneProduct,
  increaseOneProductQuantity,
  decreaseOneProductQuantity,
  deleteOneProduct,
  emptyCartProducts,
};
