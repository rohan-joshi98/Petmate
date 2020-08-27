var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var User = require("../models/user");

var profileSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqe: true,
  },
  fname: { type: String },
  lname: { type: String },
  dob: { type: Date, required: false },
  personalInfo: { type: String },
});
var userProfile = mongoose.model("userProfile", profileSchema);

module.exports = userProfile;
