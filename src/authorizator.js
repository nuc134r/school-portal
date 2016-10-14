'use strict';

let sessions = require('./session/sessions');

let db = require('./database/postgre-pool');

function authorize(login, password) {
    return new Promise((resolve, reject) => {
        if (!login || !password) {
            reject();
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

            let token_data = JSON.stringify({ utc: +(new Date()), user: user.id, payload: "Vlad is glad." });
            var token = new Buffer(token_data).toString('base64');

            sessions.push(token, user);

            resolve(token);
        } else {
            reject();
        }
    });
}

module.exports.authorize = authorize;
