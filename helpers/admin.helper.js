const path = require("path");
const usersModel = require(path.join(__dirname, "..", "models/users.model"));

async function checkRole(user) {
  const isAdmin = await usersModel.checkPrivileges(user);
  if (!isAdmin) {
    return false;
  }
  return true;
}

module.exports = { checkRole };
