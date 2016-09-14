'use strict';

let path = require('path');

/* express */
let express      = require('express');
let favicon	     = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');

/* mongo */
//let mongo = require('mongodb');
//let monk = require('monk');
//let db = monk('localhost:27017/schoolportal');

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

/* auth */
//let Authenticator = 
//app.use(authenticator);

/* repositories */
let RepoMiddleware = require('./repository/repository');
let repoMiddleware = new RepoMiddleware(/* db */);
app.use(repoMiddleware);

/* routes */
app.use('/', require('./routes/login-route'));
app.use('/', require('./routes/student-route'));
app.use(require('./routes/error-route'));

module.exports = app;