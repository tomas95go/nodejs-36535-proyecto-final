const Joi = require("joi");

const orderSchema = Joi.object({
  user: Joi.string().email().required().messages({
    "any.empty": "El email es obligatorio",
    "string.empty": "El email es obligatorio",
    "string.email": "El email debe tener un formato de email válido",
  }),
  products: Joi.array().min().required().messages({
    "any.empty":
      "El carrito debe contener al menos 1 producto para realizar el checkout",
    "array.min":
      "El carrito debe contener al menos 1 producto para realizar el checkout",
  }),
});

module.exports = orderSchema;
