var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  timeAdded: { type: Date, default: Date.now },
});

userSchema.pre("save", function (done) {
  var user = this;
  console.log(this);
  if (!user.isModified("password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      console.log("error in gen salt");
      return done(err);
    }
    console.log("no error in generating salt");
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        console.log(user.password);
        console.log("error in creating hash");
        return done(err);
      }
      console.log("no error in generating hash");
      user.password = hashedPassword;
      console.log("hashed password assigned to the user");
      done();
    });
  });
});

userSchema.methods.checkPassword = function (guess, done) {
  if (this.password != null) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
      done(err, isMatch);
    });
  }
};

var User = mongoose.model("User", userSchema);

module.exports = User;
