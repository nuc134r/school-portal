/* Express stuff */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Database stuff */
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schoolportal');

var app = express();

app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* Static resources */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/vendor')));

/* Routes */
app.use('/', require('./routes/main-route'));
app.use(require('./routes/error-route'));


module.exports = app;