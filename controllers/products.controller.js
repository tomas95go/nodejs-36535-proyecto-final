const path = require("path");
const productsModel = require(path.join(
  __dirname,
  "..",
  `models/products.model`
));

async function getAll(request, response) {
  try {
    const products = await productsModel.getAll();
    response.status(200).json({
      message: "Lista de álbumes recuperada con éxito",
      products,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al recuperar la lista de álbumes",
    });
  }
}

async function getOne(request, response) {
  try {
    const id = request.params.id;
    const product = await productsModel.getOne(id);
    if (!product) {
      return response.status(404).json({
        message: "Álbum no encontrado",
      });
    }
    response.status(200).json({
      message: "Álbum encontrado con éxito",
      product,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al buscar el álbum",
    });
  }
}

async function addOne(request, response) {
  try {
    const newProduct = request.body;
    const addedProduct = await productsModel.addOne(newProduct);
    response.status(201).json({
      message: "Nuevo álbum creado con éxito",
      addedProduct,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al crear el álbum",
    });
  }
}

async function updateOne(request, response) {
  try {
    const id = request.params.id;
    const newProductData = request.body;
    const updatedProduct = await productsModel.updateOne(id, newProductData);
    if (!updatedProduct) {
      return response.status(404).json({
        message: "Álbum no encontrado",
      });
    }
    response.status(200).json({
      message: "Álbum modificado con éxito",
      updatedProduct,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al actualizar el álbum",
    });
  }
}

async function deleteOne(request, response) {
  try {
    const id = request.params.id;
    const softDeletedProduct = await productsModel.deleteOne(id);
    if (!softDeletedProduct) {
      return response.status(404).json({
        message: "Álbum no encontrado",
      });
    }
    response.status(200).json({
      message: "Álbum borrado con éxito",
      softDeletedProduct,
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
  updateOne,
  deleteOne,
};
