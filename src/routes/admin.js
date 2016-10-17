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
router.get('/', (req, res) => res.redirect('/a/users'));

// GET /a/users
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

// GET /a/users/create
router.get('/users/create', function (req, res) {
    renderer(req, res, {},
        {
            view: 'admin/users_create',
            title: 'Новый пользователь'
        });
});

module.exports = router;