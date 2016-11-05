'use strict';

const Sequelize = require('sequelize');


function Init(sequelize) {
    let User = sequelize.define('user', {

        login: Sequelize.STRING(32),
        password: Sequelize.STRING(32),

        firstname: Sequelize.STRING,
        middlename: Sequelize.STRING,
        lastname: Sequelize.STRING,

        //image

        type: Sequelize.ENUM('student', 'teacher', 'admin')
    });
}

module.exports.Init = Init;