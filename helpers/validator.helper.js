const path = require("path");
const userSchema = require(path.join(
  __dirname,
  "..",
  "schemas/user.joi.schema"
));

async function validateUserSchema(request, response, next) {
  try {
    const user = request.body;
    const value = await userSchema.validateAsync(user, { abortEarly: false });
    console.log(value);
  } catch (error) {
    return response.status(400).json({
      message: "El formato de los datos no es correcto",
      errors: error.details,
    });
  }
}

module.exports = {
  validateUserSchema,
};
