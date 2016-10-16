'use strict';

let express = require('express');
let router = express.Router();

// GET /
router.get('/', function (req, res) {
    
    switch (req.school_context.user.type) {
        case 'student':
            res.redirect('/s');
            return;
        case 'teacher':
            res.redirect('/t');
            return;
        case 'admin':
            res.redirect('/a');
            return;
    }

    res.redirect('404');
});

module.exports = router;