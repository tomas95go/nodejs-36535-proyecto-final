const path = require("path");
const LocalStrategy = require("passport-local").Strategy;
const usersDao = require(path.join(__dirname, "..", "daos/users.dao"));
const bcrypt = require("bcrypt");
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await usersDao.findByEmail(email);
      if (!user) {
        return done(null, false);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((user, done) => {
    return done(null, usersDao.findById(user.id));
  });
}

module.exports = {
  initialize,
};
