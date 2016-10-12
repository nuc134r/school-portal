'use strict';

let sessions = require('./session/sessions');

let db = require('./database/postgre-pool');

function authorize(login, password, callback) {

    if (!login || !password) {
        callback(null);
    }

    if (login == 'admin' && password == 'admin') {
        var user = {
            id: 42,
            profile: 'igor-sychov',
            name: {
                first: 'Слава',
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
}

module.exports.authorize = authorize;
