const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    number: Number,
    items: Array,
    status: String,
    user: String,
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
