var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var path = require("path");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var config = require("./config/config.js");

//routes
var base = require("./routes/base.js");
var api = require("./routes/api.js");
var authRouter = require("./routes/auth.js");
var adminRouter = require("./routes/admin.js");


//connect to db
mongoose.connect("mongodb://localhost/" + config.db);

//base express app
var app = express();

//setup JSON requests
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//setup public facing files
app.use(express.static(path.join(__dirname + "/../public")));
app.set("views", __dirname + "/../public/views");

//setup view engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//setup auth
app.use("/api", expressJwt({secret: config.secret}));
app.use("/admin", expressJwt({secret: config.secret}));

//endpoints
app.use("/auth", authRouter);
app.use("/", base);
app.use("/api", api);
app.use("/admin", adminRouter);

app.listen(config["port"]);
