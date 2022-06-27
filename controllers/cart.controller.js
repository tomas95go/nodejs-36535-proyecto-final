const { carts, writeFile } = require("../models/cart.model");

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

module.exports = {
  add,
  deleteOne,
};
