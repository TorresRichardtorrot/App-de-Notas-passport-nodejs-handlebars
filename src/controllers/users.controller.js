
import passport from "passport";

import User from"../models/user.js";

//formulario de registro
export const renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

//datos de registros
export const signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  try {
    if (!name || !email || !password) {
      errors.push({ texto: "Los campos no pueden estar vacios." });
      res.render("users/signup", {
        errors,
        name,
        email,
      });
    } else {
      if (password != confirm_password) {
        errors.push({ texto: "la contraseña no coinciden." });
      }
      if (password.length < 4) {
        errors.push({ texto: "la contraceña debe tener mas de 4 caracteres." });
      }
      if (errors.length > 0) {
        res.render("users/signup", {
          errors,
          name,
          email,
        });
      } else {
        const emailUser = await User.findOne({ email });
        if (emailUser) {
          req.flash("error_msg", "el correo ya esta en uso.");
          res.redirect("/users/signup");
        } else {
          const newUser = new User({ name, email, password });
          newUser.password = await newUser.encryptPassword(password);
          await newUser.save();
          req.flash("message_msg", "Usuario creado correctamente");
          res.redirect("/users/signin");
        }
      }
    }
  } catch (error) {
    console.log(error);
    errors.push({ texto: "Error en el sevidor intente mas tarde" });
    res.render("users/signup", {
      errors,
      name,
      email,
    });
  }
};

//formulario de inicio
export const renderSigninForm = (req, res) => {
  res.render("users/signin");
};

//datos de inicio
export const signin = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true,
});

//salir de la app
export const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
      req.flash("success_msg", "You are logged out now.");
      res.redirect("/users/signin");
    });
  } catch (error) {
    console.error(error);
  }
};

