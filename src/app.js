'use strict';

const path = require('path');
const config = require('../config');

/* socket.io */
const socketio = require('socket.io')();
const socket = require('./socket')
socketio.set('authorization', socket.authorize);
socketio.on('connection', socket.createHandlers);

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
      css_path = path.join(__dirname, '../public/css'),
      scritps_path = path.join(__dirname, '../public/scripts'),
      assets_path = path.join(__dirname, '../public/assets'),
      socket_io_path = path.join(__dirname, '../node_modules/socket.io-client/dist');

app.use(favicon(favincon_path));
app.use(express.static(css_path));
app.use(express.static(scritps_path));
app.use(express.static(assets_path));
app.use(express.static(socket_io_path));

// creating app context in 'req' object
app.use((req, res, next) => {
      req.school_context = {}; next();
})


/* public routes */
app.use('/', require('./routes/login'));
/* auth middleware */
app.use(require('./session/middleware')());
/* authorized routes */
app.use('/', require('./routes/routes'));


app.use(require('./routes/error'));

module.exports = { express: app, socket: socketio };