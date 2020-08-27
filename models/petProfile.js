var mongoose = require("mongoose");
var petSchema = mongoose.Schema({
  pId: { type: String },
  pName: { type: String },
  owner: { type: String },
  info: { type: String },
  dob: { type: Date },
});

var petProfile = mongoose.model("petProfile", petSchema);

module.exports = petProfile;
