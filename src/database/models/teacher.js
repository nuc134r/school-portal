'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('teacher', {
        canCreateNews: Sequelize.BOOLEAN,
        canEditTimetable: Sequelize.BOOLEAN
    });

    Entity.belongsTo(sequelize.models.user, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });
}

module.exports.Init = Init;