'use strict';

let express = require('express');
let router = express.Router();

let autorizator = require('../authorizator');

// GET /login
router.get('/login', function (req, res) {
    let params = {
        error_code: req.query.reason
    };

    res.render('login', params);
    res.end();
});

// POST /authorize
router.post('/authorize', function (req, res) {

    let week = 604800;

    let result = autorizator.authorize(
        req.body.login,
        req.body.pass,
        (token) => {
            try {
                if (token) {
                    res.cookie('token', token, { maxAge: week, httpOnly: true });
                    res.redirect('/dashboard');
                    res.end();
                } else {
                    res.redirect('/login?reason=invalid_credentials');
                    res.end();
                }
            } catch (ex) { }
        });
});

module.exports = router;