'use strict';

let async = require('async');

let sessions = require('./session/sessions');

function authorize(login, password, callback) {

    if (!login || !password) {
        callback(null);
    }

    if (login == 'admin' && password == 'admin') {
        var user = {
            id: 42,
            profile: 'igor-sychov',
            name: {
                first: 'Игорь',
                last: 'Сычёв',
                middle: 'Захарович'
            },
            badges: [],
            image_id: null,
            type: 'student',
            student: {
                group: 'P-307'
            }
        }

        let token_data = JSON.stringify({ utc : +(new Date()) , user: user.id, payload: "Vlad is glad." }); 
        var token = new Buffer(token_data).toString('base64');

        sessions.push(token, user);

        callback(token);
    }

    callback(null);

    /*async.waterfall([
        (callback) => {
            pool.connect((err, client, done) => {
                if (err) {
                    console.log('error fetching client from pool');
                }

                callback(err, client, done);
            });
        },
        (client, done, callback) => {
            client.query(script.data, (err, result) => {
                if (err) {
                    
                } else {
                    sessions.push({ ... });
                }
                callback(err);
            });

            if (!err) {
                next();
            } else {
                res.redirect('/login');
                res.end();
            }

            callback(null, done);
        }
    ],
        (err, done) => {
            done();


        }
    );*/
}

module.exports.authorize = authorize;