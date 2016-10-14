'use strict';

let express = require('express');
let router = express.Router();

// GET /
router.get('/', function (req, res) {
    
    switch (req.school_context.user.type) {
        case 'student':
            res.redirect('/student');
            return;
        case 'teacher':
            res.redirect('/teacher');
            return;
    }

    res.redirect('404');
});

module.exports = router;