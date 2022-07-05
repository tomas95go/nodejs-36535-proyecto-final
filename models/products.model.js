const path = require("path");
const engine = require(path.join(__dirname, "..", "helpers/engine.helper"));
const databaseHelper = require(path.join(
  __dirname,
  "..",
  `helpers/${engine}.helper`
));

function writeFile(content) {
  try {
    databaseHelper.save(content);
  } catch (error) {
    return `Hubo un error al guardar en base de datos: ${error}`;
  }
}

module.exports = {
  albums,
  writeFile,
};
