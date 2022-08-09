const path = require("path");
const cartsModel = require(path.join(__dirname, "..", `models/carts.model`));
const usersModel = require(path.join(__dirname, "..", `models/users.model`));
const messageHelper = require(path.join(
  __dirname,
  "..",
  "helpers/messages.helper"
));

function add(request, response) {
  try {
    const { user } = request.body;
    const newCart = cartsModel.addOne(user);
    response.status(201).json({
      message: "Nuevo carrito creado con éxito",
      newCart,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al crear el carrito",
    });
  }
}

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
async function addManyProducts(request, response) {
  try {
    const id = request.params.id;
    const newAlbums = request.body;
    const cart = await cartsModel.addManyProducts(id, newAlbums);

    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    let message = "";

    if (newAlbums.length > 1) {
      message = `${newAlbums.length} productos agregados al carrito ${id} con éxito`;
    } else {
      message = `Producto agregado al carrito ${id} con éxito`;
    }

    response.status(201).json({
      message,
      cart,
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
    const id = request.params.id_cart;
    const cart = await cartsModel.getOne(id);
    const user = await usersModel.findByEmail(cart.user);
    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }
    if (!user) {
      return response.status(404).json({
        message: "Usuario del carrito no encontrado",
      });
    }
    const { products } = cart;
    await messageHelper.sendEmail(
      `Nuevo pedido de: ${user.name}. Tel: ${user.phone}`,
      "Nueva compra",
      `<div>
    <h1>Nuevo pedido de: ${user.name}. Tel: ${user.phone}</h1>
    <h2>Productos del carrito:</h2>
      <ul>
          ${products.map((product) => {
            return `<li>Product: ${product.id}</li>`;
          })}
      </ul>
    </div>`
    );
    await messageHelper.sendSMS(
      `¡Gracias por comprar con nosotros, ${user.name}! Su pedido está siendo procesado`,
      user.phone
    );
    response.status(200).json({
      message: `Checkout realizado con éxito`,
      receipt: {
        user: user.email,
        products,
      },
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al realizar el checkout del carrito",
    });
  }
}

module.exports = {
  add,
  deleteOne,
  getAllProducts,
  addManyProducts,
  deleteOneProduct,
  checkout,
};
