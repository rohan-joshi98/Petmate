var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");

module.exports = function () {
  //serialize the user
  passport.serializeUser(function (user, done) {
    console.log("serialized user ");

    done(null, user._id);
  });
  //deserialize the user
  passport.deserializeUser(function (id, done) {
    console.log("deserialized user");
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  console.log("going into local stategy");
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        console.log(email);
        console.log(password);
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            console.log("Strat: error occured in find one");
            return done(err);
          }
          if (!user) {
            console.log("strat: no user found");
            return done(null, false, { message: "No user has that Email!" });
          }
          console.log("user exists");
          user.checkPassword(password, function (err, isMatch) {
            if (err) {
              console.log("Strat: error occured in checkpassword");
              return done(err);
            }
            if (isMatch) {
              console.log("password match");

              return done(null, user);
            } else {
              console.log("password does not match");
              return done(null, false, { message: "Invalid password" });
            }
          });
        });
      }
    )
  );
  console.log("local startegy executed");
};
