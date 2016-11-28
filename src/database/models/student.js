'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Student = sequelize.define('student', {}, helper.defaultOptions);

    Student.belongsTo(sequelize.models.group);
    Student.belongsTo(sequelize.models.user);
}

module.exports.Init = Init;