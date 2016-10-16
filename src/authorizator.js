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
        } else if (login == 'admin' && password == 'admin') {
            var user = admin_mock;
        } else {
            reject();
            return;
        }

        var token = sessions.create(user);
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
    teacher: {},
    admin: {},
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
    teacher: {},
    admin: {},
    student: {}
};

let admin_mock = {
    id: 3,
    profile: null,
    name: {
        first: 'Татьяна',
        last: 'Доррер',
        middle: 'Васильевна'
    },
    badges: [],
    image_id: null,
    type: 'admin',
    teacher: {},
    admin: {},
    student: {}
};