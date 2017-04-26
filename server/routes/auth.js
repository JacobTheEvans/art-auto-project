var express = require("express");
var jwt = require("jsonwebtoken");
var authRouter = express.Router();
var bcrypt = require("bcrypt");

//import models
var User = require("../models/user.js");
var NewUser = require("../models/newUserQue.js");

//import config
var config = require("../config/config.js");

authRouter.post("/signup", function(req, res) {
  NewUser.find({
    username: req.body.username
  }, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else if (data.length > 0) {
      res.status(400).send({"message": "Username is taken"});
    } else {
      if (req.body.password != undefined) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        req.body.isOAuth = false;
      } else {
        res.status(400).send({message: "Password is required"})
      }
      var newUser = new NewUser(req.body);
      newUser.save(function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({"message": "You just signup"});
        }
      });
    }
  });
});

authRouter.post("/signin", function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      res.status(500).send(err);
    } else if (user == undefined) {
      res.status(400).send({"message": "Username does not exists"});
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err) {
          res.status(500).send(err);
        } else if(result) {
          //Generate token
          //makes xxxxx.yyyyy.zzzzss
          var token = jwt.sign(user.toObject(), config.secret, {expiresIn: "1h"});
          res.status(200).send({"message": "Here is the key", token: token, priv: user.priv});
        }
      });
    }
  });
});

module.exports = authRouter;
