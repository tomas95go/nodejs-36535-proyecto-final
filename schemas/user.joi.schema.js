const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required().label("password"),
  password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
  avatar: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = userSchema;
