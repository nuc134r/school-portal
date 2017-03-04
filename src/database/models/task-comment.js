'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('task_comment', {
        text: Sequelize.TEXT,
        newState: {
            type: Sequelize.ENUM('todo', 'sent', 'needsRevision', 'done'),
            allowNull: true
        },
        hasMark: Sequelize.BOOLEAN,
        resultMark: {
            type: Sequelize.ENUM('A', 'B', 'C', 'D'),
            allowNull: true
        }
    });

    Entity.belongsTo(sequelize.models['user'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    //Entity.belongsToMany(sequelize.models['attachment'], { through: 'task_comments_attachments' });    
}

module.exports.Init = Init;