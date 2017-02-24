'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('task_result', {
        mark: {
            type: Sequelize.ENUM('A', 'B', 'C', 'D'),
            allowNull: false
        }
    });

    Entity.belongsToMany(sequelize.models['task_comment'], { through: 'tasks_task_comments' });

}

module.exports.Init = Init;