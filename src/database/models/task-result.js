'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('task_result', {
        hasMark: Sequelize.BOOLEAN,
        mark: {
            type: Sequelize.ENUM('A', 'B', 'C', 'D'),
            allowNull: true
        },
        state: {
            type: Sequelize.ENUM('todo', 'sent', 'done'),
            allowNull: false
        }
    });

    Entity.belongsTo(sequelize.models['user'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    Entity.hasMany(sequelize.models['task_comment'], { as: 'comments' })
}

module.exports.Init = Init;