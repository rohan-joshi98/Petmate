var express = require("express");
var router = express.Router();
var ensureAuthenticated = require("../../auth/auth").ensureAuth;

router.use(ensureAuthenticated);

router.get("/", function (req, res) {
  if (res.locals.currentUser) {
    res.render("profiles/myProfile");
  } else {
    res.render("profiles/otherProfile");
  }
});

module.exports = router;
