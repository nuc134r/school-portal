'use strict';

let sessions = require('./sessions');

function SessionMiddleware() {
    
    function middleware(req, res, next) {
        
        var token = req.cookies['token'];

        if (!token) {
            res.redirect('/login?reason=no_token');
            res.end();
            return;
        }

        var session = sessions.get(token);

        if (!session) {
            res.redirect('/login?reason=session_expired');
            res.end();
            return;
        }
        
        req.school_context.user = session;
        next();
    }

    return middleware;
}

module.exports = SessionMiddleware;