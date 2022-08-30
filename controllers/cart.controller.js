const path = require("path");

const cartsModel = require(path.join(__dirname, "..", `models/carts.model`));
const usersModel = require(path.join(__dirname, "..", `models/users.model`));
const ordersModel = require(path.join(__dirname, "..", `models/orders.model`));

const messageHelper = require(path.join(
  __dirname,
  "..",
  "helpers/messages.helper"
));

async function deleteOne(request, response) {
  try {
    const id = request.params.id;
    const cart = await cartsModel.deleteOne(id);
    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }
    response.status(200).json({
      message: "Carrito borrado con éxito",
      cart,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar el carrito",
    });
  }
}

async function getAllProducts(request, response) {
  try {
    const id = request.params.id;
    const { user } = request.user;
    const cart = await cartsModel.getOneByIdAndEmail(id, user);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }
    const { products } = cart;
    response.status(200).json({
      message: `Productos del carrito: ${id} encontrados con éxito`,
      products,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al recuperar los productos del carrito",
    });
  }
}

async function addOneProduct(request, response) {
  try {
    const { user } = request.user;
    const { id } = request.params;
    const { _id: id_product } = request.body;
    const cart = await cartsModel.getOneByIdAndEmail(id, user);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const isProductInCart = cart.products.find(({ _id }) => _id === id_product);

    if (isProductInCart) {
      return response.status(400).json({
        message:
          "El producto que intenta agregar ya se encuentra presente en el carrito",
      });
    }

    const cartWithNewProduct = await cartsModel.addOneProduct(id, id_product);

    response.status(201).json({
      message: `Se ha agregado con éxito el nuevo producto: ${id_product} al carrito: ${id}`,
      cartWithNewProduct,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al agregar productos al carrito",
    });
  }
}

async function increaseOneProductQuantity(request, response) {
  try {
    const { id, id_product } = request.params;
    const { user } = request.user;
    const cart = await cartsModel.getOneByIdAndEmail(id, user);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const isProductInCart = cart.products.find(({ _id }) => _id === id_product);

    if (!isProductInCart) {
      return response.status(400).json({
        message: `El producto: ${id_product} no esta presente en el carrito`,
      });
    }

    const updatedProduct = await cartsModel.increaseOneProductQuantity(
      id,
      id_product
    );
    response.status(200).json({
      message: `Se ha incrementado con éxito la cantidad del producto: ${id_product} en el carrito: ${id}`,
      updatedProduct,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al incrementar la cantidad del producto",
    });
  }
}

async function decreaseOneProductQuantity(request, response) {
  try {
    const { id, id_product } = request.params;
    const { user } = request.user;
    const cart = await cartsModel.getOneByIdAndEmail(id, user);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const isProductInCart = cart.products.find(({ _id }) => _id === id_product);

    if (!isProductInCart) {
      return response.status(400).json({
        message: `El producto: ${id_product} no esta presente en el carrito`,
      });
    }

    const updatedProduct = await cartsModel.decreaseOneProductQuantity(
      id,
      id_product
    );
    response.status(200).json({
      message: `Se ha decrementado con éxito la cantidad del producto: ${id_product} en el carrito: ${id}`,
      updatedProduct,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al decrementar la cantidad del producto",
    });
  }
}

async function deleteOneProduct(request, response) {
  try {
    const { id, id_product } = request.params;
    const { user } = request.user;

    const cart = await cartsModel.getOneByIdAndEmail(id, user);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const isProductInCart = cart.products.find(({ _id }) => _id === id_product);

    if (!isProductInCart) {
      return response.status(400).json({
        message: `El producto: ${id_product} no esta presente en el carrito`,
      });
    }

    const deletedProduct = await cartsModel.deleteOneProduct(id, id_product);

    response.status(200).json({
      message: `Producto: ${id_product} borrado del carrito: ${id} con éxito`,
      deletedProduct,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar un producto del carrito",
    });
  }
}

async function checkout(request, response) {
  try {
    const id = request.params.id;

    const { user: email } = request.user;

    const cart = await cartsModel.getOneByIdAndEmail(id, email);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    if (!cart.products.length) {
      return response.status(404).json({
        message:
          "Su carrito no contiene productos, no puede realizar el checkout",
      });
    }

    const user = await usersModel.findByEmail(email);

    if (!user) {
      return response.status(404).json({
        message: "Usuario del carrito no encontrado",
      });
    }

    const order = await ordersModel.generateNewOrder(user.email, cart.products);

    await messageHelper.sendNewOrderEmail(user, order.items);

    await messageHelper.sendNewOrderSMS(user);

    await cartsModel.emptyCartProducts(id);

    response.status(200).json({
      message: `Checkout realizado con éxito`,
      order,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al realizar el checkout del carrito",
    });
  }
}

module.exports = {
  deleteOne,
  getAllProducts,
  addOneProduct,
  increaseOneProductQuantity,
  decreaseOneProductQuantity,
  deleteOneProduct,
  checkout,
};
