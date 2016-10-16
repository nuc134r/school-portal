'use strict';

let express = require('express');
let router = express.Router();

let renderer = require('../renderer')('admin');

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
    let params = {};
    
    renderer(req, res, params,
        {
            view: 'admin/users',
            title: 'Пользователи'
        });
});

module.exports = router;