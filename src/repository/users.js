'use strict';

const SQL = require('sql-template-strings')
const db = require('../database/postgre-pool');

function getUserList() {
    return db.execute(SQL`SELECT firstname, middlename, lastname, type FROM user_;`);
}

function createUser(options) {

    switch (options.user_type) {
        case 'student':



            break;
        case 'teacher':


            break;
        case 'admin':
            return db.execute(SQL`
                INSERT INTO user_
                    (login, password, firstname, middlename, lastname, type)
                VALUES 
                    (${options.login}, 'school13', ${options.firstname}, ${options.middlename}, ${options.lastname}, 'a')`);
    }
}

module.exports.createUser = createUser;
module.exports.getUserList = getUserList;