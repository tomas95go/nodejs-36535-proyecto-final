const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.empty": "El email es obligatorio",
    "string.empty": "El email es obligatorio",
    "string.email": "El email debe tener un formato de email válido",
  }),
  password: Joi.string().min(8).max(20).required().label("password").messages({
    "any.empty": "El email es obligatorio",
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe contener un mínimo de 8 caracteres",
    "string.max": "La contraseña debe contener un máximo de 20 caracteres",
  }),
  password_confirmation: Joi.valid(Joi.ref("password")).messages({
    "any.only": "El campo contraseña y confirmar contraseña no coinciden",
  }),
  avatar: Joi.string().required().messages({
    "any.empty": "El avatar es obligatorio",
    "string.empty": "El avatar es obligatorio",
  }),
  name: Joi.string().required().max(60).messages({
    "any.empty": "El nombre es obligatorio",
    "string.empty": "El nombre es obligatorio",
    "string.max": "El nombre debe contener un máximo de 60 caracteres",
  }),
  age: Joi.number().positive().integer().required().messages({
    "any.required": "La edad es obligatoria",
    "number.base": "La edad debe ser un número entero",
    "number.integer": "La edad debe ser un número entero",
    "number.positive": "La edad debe ser un número entero positivo",
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
});

module.exports = userSchema;
