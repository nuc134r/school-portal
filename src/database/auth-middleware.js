'use strict';

let pg = require('pg');
let async = require('async');

function AuthMiddleware(config) {

    let pool = new pg.Pool(Object.assign(config.db_user, config.db));

    function MiddlewareFunction(req, res, next) {

        async.waterfall([
            (callback) => {
                pool.connect((err, client, done) => {
                    if (err) {
                        console.log('error fetching client from pool');
                    }

                    callback(err, client, done);
                });
            },
            (client, done, callback) => {
                /*client.query(script.data, (err, result) => {
                    if (err) {
                        
                    } else {
                        
                    }
                    callback(err);
                });*/

                if (!req.cookies['lol']) {
                    callback(true, done);
                } else {
                    callback(null, done);
                }
            }
        ],
            (err, done) => {
                done();

                if (!err) {
                    next();
                } else {
                    res.redirect('/login');
                    res.end();
                }
            }
        );
    }

    return MiddlewareFunction;
}

module.exports = AuthMiddleware;