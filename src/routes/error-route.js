'use strict';

var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    var err = new Error('Not Found');
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