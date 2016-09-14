var express = require('express');
var router = express.Router();

// GET /
router.get('/login', function (req, res) {
    
    

    res.render('login', arguments);
    res.end();
});

module.exports = router;