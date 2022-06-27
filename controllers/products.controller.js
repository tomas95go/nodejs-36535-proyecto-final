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

module.exports = {
  getAll,
  getById,
};
