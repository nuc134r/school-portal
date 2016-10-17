'use strict';

var express = require('express');
var router = express.Router();


// GET /404
router.get('/404', function (req, res) {
    let error = new Error('Страница не найдена');
    error.status = 404;
    error.url = req.originalUrl;

    res.status(404);
    res.render('error', {
        error: error,
        stack: JSON.stringify(error.stack)
    });
});

router.use((req, res) => res.redirect('/404'));

module.exports = router;