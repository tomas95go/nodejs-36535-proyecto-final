const path = require("path");
const engine = require(path.join(__dirname, "..", "/helpers/engine.helper"));
const cartsDao = require(path.join(
  __dirname,
  "..",
  `daos/carts.dao.${engine}`
));

function add(request, response) {
  try {
    const newCart = cartsDao.addOne();
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
    const cart = await cartsDao.deleteOne(id);
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
    const cart = await cartsDao.getOne(id);

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
    const cart = await cartsDao.addManyProducts(id, newAlbums);

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

    cartsDao.deleteOneProduct(cartId, productId);

    response.status(200).json({
      message: `Producto: ${id_prod} borrado del carrito: ${id_cart} con éxito`,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar un producto del carrito",
    });
  }
}

module.exports = {
  add,
  deleteOne,
  getAllProducts,
  addManyProducts,
  deleteOneProduct,
};
