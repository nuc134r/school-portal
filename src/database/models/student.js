'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Student = sequelize.define('student', {}, helper.defaultOptions);

    Student.belongsTo(sequelize.models.user, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    return Student;
}

module.exports.Init = Init;