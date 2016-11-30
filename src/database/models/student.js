'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Student = sequelize.define('student', {}, helper.defaultOptions);

    Student.belongsTo(sequelize.models.group, { 
        foreignKey: { allowNull: false }, 
        onDelete: 'RESTRICT'
    });
    Student.belongsTo(sequelize.models.user, { 
        foreignKey: { allowNull: false }, 
        onDelete: 'CASCADE'
    });
}

module.exports.Init = Init;