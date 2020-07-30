var mongoose = require("mongoose");

var profileSchema = mongoose.Schema({
  username: { type: mongoose.Types.username, required: true, uniqe: true },
  fname: { type: mongoose.Types.fname, required: true, uniqe: false },
  lname: { type: mongoose.Types.lname, required: true, uniqe: false },
  dob: { type: Date },
  personalInfo: { type: String },
});
var userProfile = mongoose.model("userProfile", profileSchema);

module.exports = userProfile;
