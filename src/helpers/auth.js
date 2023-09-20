

export const isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "No estas autenticado");
    res.redirect("/users/signin");
  } catch (error) {
    console.error(error, "12");
    res.redirect("/users/signin");
  }
};


