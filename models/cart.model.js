const fileHelper = require("../helpers/file.helpers");

const filePath = "data/cart.json";
const encoding = "utf-8";
const carts = fileHelper.getFileContent(filePath, encoding);

function writeFile(content) {
  try {
    fileHelper.writeFile(filePath, content);
  } catch (error) {
    return `Hubo un error escribiendo el archivo: ${error}`;
  }
}

module.exports = {
  carts,
  writeFile,
};
