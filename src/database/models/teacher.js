'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('teacher', {
        canCreateNews: Sequelize.BOOLEAN,
        canEditTimetable: Sequelize.BOOLEAN,
        description: Sequelize.TEXT,
        position: Sequelize.TEXT,
        started_being_teacher: { type: Sequelize.DATE, allowNull: true }
    },
        {
            instanceMethods: {
                getStartedBeingTeacher: function () {
                    return this.started_being_teacher ? moment(this.started_being_teacher).format('YYYY-MM-DD') : '';
                },
                getExperienceString: function () {
                    if (!this.started_being_teacher) return "";
                    return moment(this.started_being_teacher).fromNow(true);
                }
            }
        });

    Entity.belongsTo(sequelize.models.user, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    Entity.belongsToMany(sequelize.models['subject'], { through: 'teachers_subjects' });
}

module.exports.Init = Init;