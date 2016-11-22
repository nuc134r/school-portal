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

        sessions.get(token)
            .then(user => {
                if (user) {
                    req.school_context.user = user;
                    next();
                } else {
                    res.redirect('/login?reason=session_expired');
                    res.end();
                }
                return null;
            })
            .catch(error => {
                // TODO: error page
                console.error(error);
                res.write(error.toString());
                res.end(JSON.stringify(error, null, 4));
            });
    }

    return middleware;
}

module.exports = SessionMiddleware;