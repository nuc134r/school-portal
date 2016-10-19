'use strict';

let express = require('express');
let router = express.Router();

const routes = {
    'student': '/s',
    'teacher': '/t',
    'admin': '/a'
}

// GET /
router.get('/', function (req, res) {

    var route = routes[req.school_context.user.type];

    if (route) {
        res.redirect(route);
    } else {
        let error = new Error("Invalid user type");
        console.error(error);
        // TODO: error page
    }

});

module.exports = router;