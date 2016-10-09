'use strict';

let path = require('path');
let config = require('../config');

/* express */
let express = require('express');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();

/* jade */
app.set('view engine', 'jade');
app.set('views', 'src/views');

/* util */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* static resources */
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.use(express.static(path.join(__dirname, 'public/assets')));

// creating app context object 'school_context' in 'req' object
app.use((req, res, next) => { req.school_context = {}; next(); })

/* mongo */
//let mongo = require('mongodb');
//let monk = require('monk');
//let db = monk('localhost:27017/schoolportal');

/* postgre sql */
let pg = require('pg');
let pool = new pg.Pool(Object.assign(config.db_user, config.db));

/* public routes */
app.use('/', require('./routes/login-route'));

/* session */
app.use(require('./session/middleware')());

/* repositories */
app.use(require('./repository/middleware')(/* db */));

/* authorized routes */
app.use('/', require('./routes/student-route'));
app.use(require('./routes/error-route'));

module.exports = app;