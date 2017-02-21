'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('task_comment', {
        text: Sequelize.TEXT,
        mark: {
            type: Sequelize.ENUM('excellent', 'good', 'ok', 'needs_revision'),
            allowNull: true
        }
    });

    //Entity.belongsToMany(sequelize.models['attachment'], { through: 'task_comments_attachments' });
    
    Entity.belongsTo(sequelize.models['user'], { 
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });
}

module.exports.Init = Init;