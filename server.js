var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");

var session = require("express-session");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var q = require("q");

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var dbConnectionString = "mongodb://localhost/domeafavor";

//connect to mongodb on openshift
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    dbConnectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(dbConnectionString);

app.use(cookieParser());
app.use(session({
    secret: process.env.PASSPORT_SECRET || "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/client"));

require("./public/server/app.js")(app, db, mongoose, q, passport, bcrypt, LocalStrategy);

app.listen(port, ipaddress);