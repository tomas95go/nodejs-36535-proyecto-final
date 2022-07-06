const mongoose = require("mongoose");
const path = require("path");
const engine = require(path.join(__dirname, "/helpers/engine.helper"));

async function connectMongo() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
      {
        dbName: process.env.MONGO_DATABASE,
      }
    );
    return connection;
  } catch (error) {
    console.log(
      `Hubo un error al conectarse a la base de datos mongo: ${error}`
    );
  }
}

async function connect() {
  try {
    if (engine === "mongo") {
      await connectMongo();
    } else if (engine === "firebase") {
      return "Ha elegido firebase";
    } else {
      console.log(
        `Por favor, elija "mongo" o "firebase" como motor de la base de datos para continuar. Motor elegido: ${engine}`
      );
    }
  } catch (error) {
    console.log(
      `Hubo un error al determinar el motor de la base de datos: ${error}`
    );
  }
}

module.exports = {
  connect,
};
