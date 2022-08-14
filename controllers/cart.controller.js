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
    const cart = await cartsModel.getOne(id);

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

function deleteOneProduct(request, response) {
  try {
    const { id_cart, id_prod } = request.params;
    const cartId = id_cart;
    const productId = Number(id_prod);

    cartsModel.deleteOneProduct(cartId, productId);

    response.status(200).json({
      message: `Producto: ${id_prod} borrado del carrito: ${id_cart} con éxito`,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar un producto del carrito",
    });
  }
}

async function checkout(request, response) {
  try {
    const { user, phone, products } = request.body;
    /*const order = await ordersModel.generateNewOrder(user, products);
    await messageHelper.sendNewOrderEmail(userData, order.items);
    await messageHelper.sendNewOrderSMS(userData);
    response.status(200).json({
      message: `Checkout realizado con éxito`,
      order,
    });*/
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
  deleteOneProduct,
  checkout,
};
