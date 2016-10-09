'use strict';

var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    let error = new Error('Страница не найдена');
    error.status = 404;
    error.url = req.originalUrl;

    res.status(404);
    res.render('error', {
        error: error,
        stack: JSON.stringify(error.stack)
    });
});

module.exports = router;