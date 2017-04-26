var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("NewUser", newUserSchema);
