var express = require("express");
var uploadRouter = express.Router();

//handle file uploads
var multer = require("multer");
var fs = require("fs");
var path = require("path");

//setup storage on system settings
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, "stock.xlsx");
  }
});

//uploader function for a file
var upload = multer({
  storage: storage //storage settings
}).single("file");

//Actual end point for post
uploadRouter.post("/stock", function(req, res) {
  upload(req , res, function(err) {
    if(err) {
      res.status(502).send({error_code:1,err_desc:err});
    } else {
      res.status(200).send({message: "File has been uploaded"});
    }
  });
});

module.exports = uploadRouter;
