const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use('local',
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "No se ha encontrado el usuario" });
        } else {
          // Comparar contraseña
          const match = await user.matchPassword(password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Contraseña incorrecta" });
          }
        }
      } catch (err) {
        return done(err); // Manejar errores generales
      }
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

