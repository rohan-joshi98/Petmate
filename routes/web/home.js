var express = require("express");
var passport = require("passport");
var User = require("../../models/user");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var router = express.Router();

router.get("/", function (req, res) {
  console.log("Hello we are on the home page");
  res.render("home/index");
});

router.get("/about", function (req, res) {
  console.log("Successfully landed on about");
  res.render("home/about");
});

router.get("/login", function (req, res) {
  console.log("We are on login page");
  res.render("home/login");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/signup", function (req, res) {
  console.log("Registration page");
  res.render("home/signup");
});

router.get("/signup", function (req, res) {
  res.render("home/signup");
});

router.post(
  "/signup",
  function (req, res, next) {
    console.log(req);
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "There's already an account with this email");
        return res.redirect("/signup");
      }

      var newUser = new User({
        fname: fname,
        lname: lname,
        username: username,
        password: password,
        email: email,
      });

      newUser.save(next);
    });
  },
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
