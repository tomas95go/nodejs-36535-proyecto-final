const mongoose = require("mongoose");
async function connect() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
      {
        dbName: process.env.MONGO_DATABASE,
      }
    );
    return connection;
  } catch (error) {
    throw `Hubo un error al conectarse a la base de datos mongo: ${error}`;
  }
}

module.exports = {
  connect,
};
