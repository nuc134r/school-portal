'use strict';

var express = require('express');
var router = express.Router();

//TODO Cleanup
router.use((req, res, next) => {
    var err = new Error('Страница не найдена');
    err.status = 404;
    next(err);
});

// production error handler
router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Ошибка',
        error: err,
        stack: JSON.stringify(err.stack)
    });
});

module.exports = router;