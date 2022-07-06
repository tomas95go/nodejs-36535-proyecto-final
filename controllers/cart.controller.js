/*const { carts, writeFile } = require("../models/cart.model");

function add(request, response) {
  try {
    const newCart = {
      id: autoIncrementId(),
      products: [],
      active: true,
      timestamp: new Date().toLocaleString("es-AR"),
    };
    carts.push(newCart);
    writeFile(carts);
    response.status(201).json({
      message: "Nuevo carrito creado con éxito",
      carts,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al crear el carrito",
    });
  }
}

function getMaxId() {
  return Math.max(...carts.map(({ id }) => id + 1));
}

function autoIncrementId() {
  const nextId = carts.length ? getMaxId() : 1;
  return nextId;
}

function findById(id) {
  const cart = carts.find(({ id: cartid }) => cartid === id);
  return cart;
}

function deleteOne(request, response) {
  try {
    const id = Number(request.params.id);
    const cart = findById(id);
    if (!cart) {
      return response.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    cart.active = false;
    writeFile(carts);

    response.status(200).json({
      message: "Carrito borrado con éxito",
      carts,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar el carrito",
    });
  }
}

function getAllProducts(request, response) {
  try {
    const id = Number(request.params.id);
    const cart = findById(id);
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

function addOneProduct(request, response) {
  try {
    const cartId = Number(request.params.id);
    const newAlbum = request.body;

    const cart = findById(cartId);
    cart.products.push(newAlbum);
    writeFile(carts);

    response.status(201).json({
      message: `${newAlbum.name} agregado al carrito ${cartId} con éxito`,
      cart,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al agregar un producto al carrito",
    });
  }
}

function addManyProducts(request, response) {
  try {
    const cartId = Number(request.params.id);
    const newAlbums = request.body;

    const cart = findById(cartId);
    cart.products.push(...newAlbums);
    writeFile(carts);

    let message = "";

    if (newAlbums.length > 1) {
      message = `${newAlbums.length} productos agregados al carrito ${cartId} con éxito`;
    } else {
      message = `Producto agregado al carrito ${cartId} con éxito`;
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
    const cartId = Number(id_cart);
    const productId = Number(id_prod);
    const cart = findById(cartId);

    const productIndex = cart.products.findIndex(({ id }) => id === productId);

    if (productIndex === -1) {
      return response.status(200).json({
        message: `El producto: ${id_prod} no existe en el carrito: ${id_cart}`,
      });
    }
    cart.products.splice(productIndex, 1);

    writeFile(carts);
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
  addOneProduct,
  addManyProducts,
  deleteOneProduct,
};*/
