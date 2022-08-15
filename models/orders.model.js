const path = require("path");

const Order = require(path.join(__dirname, "..", "schemas/order.mongo.schema"));

async function generateNewOrder(user, products) {
  try {
    const nextOrderNumber = await getNextOrderNumber();
    const order = new Order({
      number: nextOrderNumber,
      status: "generada",
      user: user,
      items: products,
    });

    await order.save();

    return order;
  } catch (error) {
    throw "Hubo un error al generar la nueva orden";
  }
}

async function getNextOrderNumber() {
  try {
    const nextOrderNumber = await Order.find().countDocuments({}).exec();
    return nextOrderNumber ? nextOrderNumber : 1;
  } catch (error) {
    throw "No se pudo recuperar el número de orden";
  }
}

module.exports = {
  generateNewOrder,
};
