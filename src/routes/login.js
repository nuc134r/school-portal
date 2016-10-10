'use strict';

let express = require('express');
let router = express.Router();

let autorizator = require('../authorizator');

// GET /login
router.get('/login', function (req, res) {
    let params = {
        error_code: req.query.reason,
        login: req.query.login
    };

    res.render('login', params);
    res.end();
});

// POST /authorize
router.post('/authorize', function (req, res) {

    let week = 24 * 7 * 60 * 60 * 1000;

    let login = req.body.login;
    let password = req.body.pass;

    // TODO refactor using promises
    let result = autorizator.authorize(login, password,
        (token) => {
            try {
                if (token) {
                    res.cookie('token', token, { maxAge: week, httpOnly: true });
                    res.redirect('/dashboard');
                    res.end();
                } else {
                    var redirect_url = '/login?reason=invalid_credentials';

                    if (login) {
                        redirect_url += `&login=${login}`;
                    }

                    res.redirect(redirect_url);
                    res.end();
                }
            } catch (ex) { }
        });
});

module.exports = router;