var express = require("express");
var adminRouter = express.Router();

//import models
var User = require("../models/user.js");
var NewUser = require("../models/newUserQue.js");
var Record = require("../models/record.js");

//import additional routers
var uploadRouter = require("./upload.js");

adminRouter.use(uploadRouter);

adminRouter.get("/newusers", function(req, res) {
  NewUser.find({}, function(err, data) {
    if (err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      var sendData = data.map(function(item) {
        return {username: item.username, _id: item._id}
      });
      res.status(200).send(sendData);
    }
  });
});

adminRouter.delete("/newusers/:id", function(req, res) {
  NewUser.findOne({
    _id: req.params.id
  }, function(err, data) {
    if (err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      data.remove(function(err, data) {
        if (err) {
          res.status(500).send({"message": "Err", err: err});
        } else {
          res.status(200).send({"message": "Success item delted", data: data});
        }
      });
    }
  });
});

adminRouter.get("/users", function(req, res) {
  User.find({}, function(err, data) {
    if (err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      var sendData = data.map(function(item) {
        return {username: item.username, _id: item._id, priv: item.priv}
      });
      res.status(200).send(sendData);
    }
  });
});

adminRouter.post("/users/:id", function(req, res) {
  NewUser.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      User.find({
        username: user.username
      }, function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else if (data.length > 0) {
          res.status(400).send({"message": "Username is taken"});
        } else {
          var newUserData = {
            username: user.username,
            password: user.password,
          }
          if(req.body.isAdmin) {
            newUserData.priv = "admin";
          } else {
            newUserData.priv = "user";
          }
          var newUser = new User(newUserData);
          newUser.save(function(err, data) {
            if (err) {
              res.status(500).send(err);
            } else {
              user.remove(function(err, data) {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(200).send({"message": "User approved"});
                }
              })
            }
          });
        }
      });
    }
  });
});

adminRouter.delete("/user/:id", function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, data) {
    if (err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      data.remove(function(err, data) {
        if (err) {
          res.status(500).send({"message": "Err", err: err});
        } else {
          res.status(200).send({"message": "Success item delted", data: data});
        }
      });
    }
  });
});

adminRouter.get("/records", function(req, res) {
  Record.find({}, function(err, data) {
    if (err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = adminRouter;
