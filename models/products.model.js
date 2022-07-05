const path = require("path");
const engine = require(path.join(__dirname, "..", "helpers/engine.helper"));
const databaseDAO = require(path.join(
  __dirname,
  "..",
  `daos/products.dao.${engine}`
));

const albums = [];

function writeFile(content) {
  try {
    databaseDAO.save(content);
  } catch (error) {
    return `Hubo un error al guardar en base de datos: ${error}`;
  }
}

module.exports = {
  albums,
  writeFile,
};
