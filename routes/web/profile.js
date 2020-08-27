var express = require("express");
const userProfile = require("../../models/profile");
const User = require("../../models/user");
//const Schema = mongoose.Schema;
const { session } = require("passport");
var router = express.Router();
var ensureAuthenticated = require("../../auth/auth").ensureAuth;

router.use(ensureAuthenticated);

router.get("/", function (req, res) {
  res.render("profiles/myProfile");
});

router.get("/update", function (req, res) {
  res.render("profiles/updateProfile");
});

router.post("/update", function (req, res, next) {
  console.log("no request");
  var info = req.body.info;
  console.log("info");

  newProfile = new userProfile({
    username: req.user.username,
    personalInfo: info,
  });
  newProfile.save(next);
  console.log("profile saved");
  res.render("profiles/myProfile");
});

router.get("/:username", function (req, res) {
  User.findOne(
    { username: req.params.username },
    res.render("profiles/otherProfile")
  );
});

// router.get("/:username", function (req, res, next) {
//   if (res.locals.currentUser == req.user.username) {
//     res.render("profiles/myProfile");
//   } else {
//     res.render("profiles/otherProfile");
//   }
// });

module.exports = router;
