const albums = require("../models/products.model");

function getAll(request, response) {
  response.status(200).json(albums);
}
module.exports = {
  getAll,
};
