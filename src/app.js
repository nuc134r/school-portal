'use strict';

let path = require('path');

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

/* public routes */
app.use('/', require('./routes/login'));

/* session */
app.use(require('./session/middleware')());

/* repositories */
app.use(require('./repository/middleware')(/* db */));

/* authorized routes */
app.use('/', require('./routes/main'));
app.use('/s', require('./routes/student'));
app.use('/t', require('./routes/teacher'));
app.use('/a', require('./routes/admin'));
app.use(require('./routes/error'));

module.exports = app;