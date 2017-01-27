'use strict';

import path = require('path');
import config = require('../config');

/* express */
import express = require('express');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

let app = express();

/* jade */
app.set('view engine', 'jade');
app.set('views');

/* util */
app.use(logger(config.logger_format));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 
/* database */
import database = require('./database/database');
database.Init();

/* static resources */
const favincon_path = path.join(__dirname, '../public/favicon.ico'),
      css_path      = path.join(__dirname, '../public/css'),
      scritps_path  = path.join(__dirname, '../public/scripts'),
      assets_path   = path.join(__dirname, '../public/assets');

app.use(favicon(favincon_path));
app.use(express.static(css_path));
app.use(express.static(scritps_path));
app.use(express.static(assets_path));

// creating app context in 'req' object
app.use((req, res, next) => { 
      req.school_context = {}; next(); 
})

/* public routes */
app.use('/', require('./routes/login'));

/* session */
app.use(require('./session/middleware')());

/* authorized routes */
app.use('/', require('./routes/routes'));

// TODO: move to ./routes/routes
//app.use('/', require('./routes/main'));
//app.use('/s', require('./routes/student'));
//app.use('/t', require('./routes/teacher'));
//app.use('/a', require('./routes/admin'));

app.use(require('./routes/error'));

module.exports = app;