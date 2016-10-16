'use strict';

let express = require('express');
let router = express.Router();

let renderer = require('../renderer')('admin');

let async = require('async');

router.use((req, res, next) => {
    if (req.school_context.user.type != 'admin') {
        res.redirect('..');
    } else {
        next();
    }
});

// GET /
router.get('/', function (req, res) {
    res.redirect('/a/users');
});

// GET /a/dashboard
router.get('/users', function (req, res) {

    async.waterfall([
        (callback) => {
            req.school_context.repository.users.getUserList()
                .then(result => callback(null, result))
                .catch(error => callback(error));
        }
    ],
        (error, users) => {
            let params = { users, error };

            renderer(req, res, params,
                {
                    view: 'admin/users',
                    title: 'Пользователи'
                });
        }
    );

});

module.exports = router;