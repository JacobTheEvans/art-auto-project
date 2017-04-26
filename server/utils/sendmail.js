var nodemailer = require("nodemailer");
var config = require("../config/config.js");

var sendMail = function(user, item, amount) {
  var transporter = nodemailer.createTransport("smtps://" + config.email + ":" + config.password  +"@smtp.gmail.com");
  var today = new Date();
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "<" + config.email + ">", // sender address
      to: config.enduser, // list of receivers
      subject: "Update Frame:  " + user, // Subject line
      text: "User: " + user + "\n" + "Item: " + item + "\n" + "Amount: " + amount, // plaintext body
      html: "<p>" + "User: " + user + "<br>" + "Item: " + item + "<br>" + "Amount: " + amount+"</p>" // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log("Message sent: " + info.response);
  });
}

module.exports = sendMail;
