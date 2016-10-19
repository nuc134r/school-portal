'use strict';

let sessions = require('./session/sessions');

function authorize(login, password) {
    return new Promise((resolve, reject) => {
        if (!login || !password) {
            reject('no_credentials_supplied');
        }

        var user = null;

        if (login == 'student' && password == 'student') {
            user = student_mock;
        } else if (login == 'teacher' && password == 'teacher') {
            user = teacher_mock;
        } else if (login == 'admin' && password == 'admin') {
            user = admin_mock;
        } else {
            reject('invalid_credentials');
            return;
        }

        sessions.create(user)
            .then(token => resolve(token))
            .catch(error => {
                console.error(error);
                reject(error.code);
            });
    });
}

module.exports.authorize = authorize;

let student_mock = {
    id: 42,
    image_id: null,
    type: 's',
    roles: [],
    name: {
        first: 'Слава',
        last: 'Сычёв',
        middle: 'Захарович'
    },
    student: {
        group: 'P-307',
        profile: 'slava-sychov',
        badges: []
    }
};

let teacher_mock = {
    id: 15,
    image_id: null,
    type: 't',
    roles: [],
    name: {
        first: 'Александр',
        last: 'Глускер',
        middle: 'Игоревич'
    },
    teacher: {
        profile: 'alexander-glusker'
    }
};

let admin_mock = {
    id: 1,
    image_id: null,
    type: 'a',
    roles: [],
    name: {
        first: 'Татьяна',
        last: 'Доррер',
        middle: 'Васильевна'
    }
};