'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('task', {
        name: helper.nonEmptyString(128, "имя"),
        text: Sequelize.TEXT,
        isRemote: Sequelize.BOOLEAN,
        hasDueDate: Sequelize.BOOLEAN,
        dueDate: Sequelize.DATE
    },
        {
            instanceMethods: {
                getDisplayName: function () {
                    return this.name;
                },
                getDueDate: function () {
                    return this.hasDueDate ? moment(this.dueDate).format('YYYY-MM-DD') : '';
                },
                getDisplayDueDate: function () {
                    return this.hasDueDate ? moment(this.dueDate).format('LL') : '';
                },
                isDueDateSoon: function () {
                    let dueDateMoment = moment(this.dueDate);
                    let nowMoment = moment();
                    let days = Math.ceil(dueDateMoment.diff(nowMoment, 'days', true));
                    return {
                        isSoon: days <= 1,
                        daysLeft: days
                    };
                }
            }
        });

    //Entity.belongsToMany(sequelize.models['attachment'], { through: 'tasks_attachments' });

    Entity.hasMany(sequelize.models['task_result'], { as: 'results' })

    Entity.belongsToMany(sequelize.models['group'], { through: 'tasks_groups' });

    Entity.belongsTo(sequelize.models['user'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });
    Entity.belongsTo(sequelize.models['subject'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });
}

module.exports.Init = Init;