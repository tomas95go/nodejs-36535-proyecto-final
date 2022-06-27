const albums = require("../models/products.model");

function getAll(request, response) {
  try {
    response.status(200).json({
      message: "Lista de álbumes recuperada con éxito",
      albums,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al recuperar la lista de álbumes",
    });
  }
}

function getById(request, response) {
  try {
    const id = Number(request.params.id);
    const album = albums.find(({ id: albumid }) => albumid === id);
    if (!album) {
      return response.status(404).json({
        message: "Álbum no encontrado",
      });
    }
    response.status(200).json({
      message: "Álbum encontrado con éxito",
      album,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al buscar el álbum",
    });
  }
}

function add(request, response) {
  try {
    const newAlbum = request.body;
    newAlbum.id = autoIncrementId();
    newAlbum.active = true;
    response.status(201).json({
      message: "Nuevo álbum creado con éxito",
      newAlbum,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al crear el álbum",
    });
  }
}

function getMaxId() {
  return Math.max(...albums.map(({ id }) => id + 1));
}

function autoIncrementId() {
  const nextId = albums.length ? getMaxId() : 1;
  return nextId;
}

module.exports = {
  getAll,
  getById,
  add,
};
