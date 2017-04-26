var express = require("express");
var apiRoute = express.Router();
var fs = require("fs");

//import middleware for log
var userData = require("../middleware/userData.js");

//import function to sendupdate via email
var sendMail = require("../utils/sendmail.js");

//import record model
var Record = require("../models/record.js");

apiRoute.use(userData);

apiRoute.get("/", function(req, res) {
  var obj = JSON.parse(fs.readFileSync(__dirname + "/../data/data.json", "utf8"));
  res.status(200).send({"message": "Frame Data", data: obj});
});

apiRoute.post("/", function(req, res) {
  var data = {
    username: req.body.username,
    amount: req.body.amount,
    item: req.body.item.item
  }
  var newRecord = new Record(data);
  newRecord.save(function(err, data) {
    if(err) {
      res.status(500).send(err);
    } else {
      sendMail(data.username, data.item, data.amount);
      res.status(200).send({"message": "Success"});
    }
  })
});

module.exports = apiRoute;
