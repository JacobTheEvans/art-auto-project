var User = require("../models/user.js");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

var config = require("../config/config.js");


//connect to db
mongoose.connect("mongodb://localhost/" + config.db);

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("admin", salt);

var user = {
  username: "admin",
  password: hash,
  priv: "admin"
}

var newUser = new User(user);
newUser.save(function(err, data) {
  if (err) {
    console.log("Err", err);
  } else {
    console.log("Success user admin with password admin made");
  }
});
