var express = require('express');
var router = express.Router();

// GET /login
router.get('/login', function (req, res) {
    res.render('login', arguments);
    res.end();
});

// POST /authorize
router.post('/authorize', function (req, res) {
    var a = 5;

    if (body.login && body.pass) {
        if (body.login == 'admin' && body.pass == '12345') {
            res.
        }
    }
});

module.exports = router;