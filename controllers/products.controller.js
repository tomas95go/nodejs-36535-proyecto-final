const { albums, writeFile } = require("../models/products.model");

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

function getOne(request, response) {
  try {
    const id = Number(request.params.id);
    const album = findById(id);
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

function addOne(request, response) {
  try {
    const newAlbum = request.body;
    newAlbum.id = autoIncrementId();
    newAlbum.active = true;
    newAlbum.timestamp = new Date().toLocaleString("es-AR");
    albums.push(newAlbum);
    writeFile(albums);
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

function addMany(request, response) {
  try {
    const newAlbums = request.body;

    newAlbums.forEach((newAlbum) => {
      newAlbum.id = autoIncrementId();
      newAlbum.active = true;
      newAlbum.timestamp = new Date().toLocaleString("es-AR");
      albums.push(newAlbum);
    });

    writeFile(albums);

    let message = "";

    if (newAlbums.length > 1) {
      message = "Nuevos álbumes creados con éxito";
    } else {
      message = "Nuevo álbum creado con éxito";
    }

    response.status(201).json({
      message,
      albums,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al crear muchos álbumes",
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

function findById(id) {
  const album = albums.find(({ id: albumid }) => albumid === id);
  return album;
}

function updateOne(request, response) {
  try {
    const id = Number(request.params.id);
    const oldAlbum = findById(id);
    if (!oldAlbum) {
      return response.status(404).json({
        message: "Álbum no encontrado",
      });
    }
    const oldAlbumIndex = albums.findIndex((album) => album.id === oldAlbum.id);
    albums.splice(oldAlbumIndex, 1);
    const newAlbum = request.body;
    newAlbum.id = oldAlbum.id;
    newAlbum.active = oldAlbum.active;
    albums.push(newAlbum);
    writeFile(albums);
    response.status(200).json({
      message: "Álbum modificado con éxito",
      newAlbum,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al actualizar el álbum",
    });
  }
}

function deleteOne(request, response) {
  try {
    const id = Number(request.params.id);
    const album = findById(id);
    if (!album) {
      return response.status(404).json({
        message: "Álbum no encontrado",
      });
    }

    album.active = false;
    writeFile(albums);

    response.status(200).json({
      message: "Álbum borrado con éxito",
      album,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar el álbum",
    });
  }
}

module.exports = {
  getAll,
  getOne,
  addOne,
  addMany,
  updateOne,
  deleteOne,
};
