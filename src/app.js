'use strict';

/* express */
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

/* database */
//let mongo = require('mongodb');
//let monk = require('monk');
//let db = monk('localhost:27017/schoolportal');

/* app */
let app = express();

app.set('view engine', 'jade');
app.set('views', 'src/views');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* auth */
//app.use(authenticator);

/* static resources */
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.use(express.static(path.join(__dirname, 'public/assets')));

/* repositories */
let Repository = require('./repository/repository');
let repository = new Repository(/* db */);
app.use(repository);

/* routes */
app.use('/', require('./routes/main-route'));
app.use(require('./routes/error-route'));

module.exports = app;