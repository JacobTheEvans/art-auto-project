var express = require("express");
var baseRoute = express.Router();

baseRoute.get("/", function(req, res) {
  res.render("index.html");
});

module.exports = baseRoute;
