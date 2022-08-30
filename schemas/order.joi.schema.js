const Joi = require("joi");

const orderSchema = Joi.object({
  user: Joi.string().email().required().messages({
    "any.empty": "El email es obligatorio",
    "string.empty": "El email es obligatorio",
    "string.email": "El email debe tener un formato de email válido",
  }),
  address: Joi.string().required().messages({
    "any.empty": "La dirección es obligatoria",
    "string.empty": "La dirección es obligatoria",
  }),
  phone: Joi.string().min(8).max(15).required().messages({
    "any.empty": "El número de teléfono es obligatorio",
    "string.empty": "El número de teléfono es obligatorio",
    "string.min":
      "El número de teléfono debe contener un mínimo de 8 caracteres",
    "string.max":
      "El número de teléfono debe contener un máximo de 20 caracteres",
  }),
  products: Joi.array().min(1).required().messages({
    "any.empty":
      "El carrito debe contener al menos 1 producto para realizar el checkout",
    "array.min":
      "El carrito debe contener al menos 1 producto para realizar el checkout",
  }),
});

module.exports = orderSchema;
