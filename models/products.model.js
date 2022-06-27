const fileHelper = require("../helpers/file.helpers");

const filePath = "data/products.json";
const encoding = "utf-8";
const albums = fileHelper.getFileContent("data/products.json", "utf-8");

function writeFile(content) {
  try {
    fileHelper.writeFile(filePath, content);
  } catch (error) {
    return `Hubo un error escribiendo el archivo: ${error}`;
  }
}

module.exports = {
  albums,
  writeFile,
};
