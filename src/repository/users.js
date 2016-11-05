'use strict';

const SQL = require('sql-template-strings')
const db = require('../database/postgre-pool');

const database = require('../database/database');
const connection = database.getConnection();


function getUserList() {
    return connection.models.user.findAll({
        attributes: ['firstname', 'middlename', 'lastname', 'type']
    });
}

function createUser(options) {

    return connection.models.user.create({
        firstname: options.firstname,
        middlename: options.middlename,
        lastname: options.lastname,
        login: options.login,
        password: options.password,
        type: options.user_type
    });
}

module.exports.createUser = createUser;
module.exports.getUserList = getUserList;