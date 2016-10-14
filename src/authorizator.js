'use strict';

let sessions = require('./session/sessions');

let db = require('./database/postgre-pool');

function authorize(login, password) {
    return new Promise((resolve, reject) => {
        if (!login || !password) {
            reject();
        }

        var user = null;

        if (login == 'student' && password == 'student') {
            var user = student_mock;
        } else if (login == 'teacher' && password == 'teacher') {
            var user = teacher_mock;
        } else {
            reject();
            return;
        }

        let token_data = JSON.stringify({ utc: +(new Date()), user: user.id, payload: "Vlad is glad." });
        var token = new Buffer(token_data).toString('base64');

        sessions.push(token, user);

        resolve(token);
    });
}

module.exports.authorize = authorize;

let student_mock = {
    id: 42,
    profile: 'slava-sychov',
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
};

let teacher_mock = {
    id: 15,
    profile: 'alexander-glusker',
    name: {
        first: 'Александр',
        last: 'Глускер',
        middle: 'Игоревич'
    },
    badges: [],
    image_id: null,
    type: 'teacher',
    teacher: {}
};