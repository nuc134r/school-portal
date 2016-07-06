var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/index.html', function(req, res) {
    res.redirect('/');
    res.end();
});

module.exports = router;