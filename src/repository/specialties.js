'use strict';

const database = require('../database/database');
const connection = database.getConnection();


function getSpecialtyList() {
    return connection.models.specialty.findAll();
}

function createSpecialty(options) {

    return connection.models.specialty.create({
        /*firstname: options.firstname,
        middlename: options.middlename,
        lastname: options.lastname,
        login: options.login,
        password: options.password,
        type: options.user_type*/
    });
}

module.exports.getSpecialtyList = getSpecialtyList;
module.exports.createSpecialty = createSpecialty;