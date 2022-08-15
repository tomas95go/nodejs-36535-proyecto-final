const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    img: String,
    stock: Number,
    active: Boolean,
  },
  {
    timestamps: true,
    collation: { locale: "en_US", strength: 1 },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
