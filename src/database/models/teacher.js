'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('teacher', {
        canCreateNews: Sequelize.BOOLEAN,
        canEditTimetable: Sequelize.BOOLEAN,
        description: Sequelize.TEXT
    });

    Entity.belongsTo(sequelize.models.user, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    Entity.belongsToMany(sequelize.models['subject'], { through: 'teachers_subjects' });
}

module.exports.Init = Init;