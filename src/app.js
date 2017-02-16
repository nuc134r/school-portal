'use strict';

const path = require('path');
const config = require('../config');

/* express */
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');

let app = express();

/* jade */
app.set('view engine', 'jade');
app.set('views');

/* util */
app.use(logger(config.logger_format));
app.use(busboy({ immediate: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 
/* database */
const database = require('./database/database');
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
app.use(require('./session/middleware')());
app.use('/', require('./routes/routes'));

app.use(require('./routes/error'));

module.exports = app;