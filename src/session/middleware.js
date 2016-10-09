'use strict';

let sessions = require('./sessions');

function SessionMiddleware() {
    
    function middleware(req, res, next) {
        
        var session = sessions.get(req.cookies['token']);
        
        if (session) {
            req.school_context.user = session;
            next();
        } else {
            res.redirect('/login?reason=no_token');
            res.end();
        }
    }

    return middleware;
}

module.exports = SessionMiddleware;