var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  priv: {
    type: String,
    enum: ["admin", "user"],
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
