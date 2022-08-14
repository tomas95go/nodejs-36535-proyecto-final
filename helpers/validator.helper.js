const path = require("path");

const userSchema = require(path.join(
  __dirname,
  "..",
  "schemas/user.joi.schema"
));

const orderSchema = require(path.join(
  __dirname,
  "..",
  "schemas/order.joi.schema"
));

async function validateUserSchema(request, response, next) {
  try {
    const user = request.body;
    await userSchema.validateAsync(user, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map((detail) => detail.message);
    return response.status(400).json({
      message: "El formato de los datos no es correcto",
      errors,
    });
  }
}

async function validateOrderSchema(request, response, next) {
  try {
    const temporaryOrder = request.body;
    await orderSchema.validateAsync(temporaryOrder, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const errors = error.details.map((detail) => detail.message);
    return response.status(400).json({
      message: "El formato de los datos no es correcto",
      errors,
    });
  }
}

module.exports = {
  validateUserSchema,
  validateOrderSchema,
};
