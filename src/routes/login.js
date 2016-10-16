'use strict';

let express = require('express');
let router = express.Router();

let autorizator = require('../authorizator');
const sessions = require('../session/sessions');

const config = require('../../config.json');
const moment = require('moment');

// GET /login
router.get('/login', function (req, res) {
    let params = {
        error_code: req.query.reason,
        login: req.query.login
    };

    res.render('login', params);
    res.end();
});

// GET /logout
router.get('/logout', function (req, res) {
    sessions.remove(req.cookies["token"]);
    res.clearCookie('token');

    res.redirect('/login');
    res.end();
});

// POST /authorize
router.post('/authorize', function (req, res) {
    let login = req.body.login;
    let password = req.body.pass;

    autorizator
        .authorize(login, password)
        .then(token => {
            let session_expires = moment().add(config.session_timeout_in_hours, 'hours');

            res.cookie('token', token, { expires: session_expires.toDate(), httpOnly: true });
            res.redirect('/');
        },
        () => {
            var redirect_url = '/login?reason=invalid_credentials' + (login ? `&login=${login}` : '')
            res.redirect(redirect_url);
        });
});

module.exports = router;