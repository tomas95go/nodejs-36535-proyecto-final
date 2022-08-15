const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    emitter: String,
    receiver: String,
    subject: String,
    room: String,
    messages: [],
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", cartSchema);

module.exports = Chat;
