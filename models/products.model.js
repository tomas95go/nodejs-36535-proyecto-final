const fileHelper = require("../helpers/file.helpers");

const albums = fileHelper.getFileContent("data/products.json", "utf-8");

module.exports = albums;
