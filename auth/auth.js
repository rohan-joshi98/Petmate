var ensureAuth = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be loged in to see this view");
    res.redirect("/login");
  }
};

module.exports = { ensureAuth };
