'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('lesson', {
        weekday: Sequelize.ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat')
    }, helper.defaultOptions);

    Entity.belongsTo(sequelize.models['subject'], { 
        foreignKey: { allowNull: false }, 
        onDelete: 'RESTRICT'
    });

    Entity.belongsTo(sequelize.models['teacher'], { 
        foreignKey: { allowNull: false }, 
        onDelete: 'RESTRICT'
    });

    Entity.belongsTo(sequelize.models['group'], { 
        foreignKey: { allowNull: false }, 
        onDelete: 'RESTRICT'
    });

    Entity.belongsTo(sequelize.models['timing'], { 
        foreignKey: { allowNull: false }, 
        onDelete: 'RESTRICT'
    });

    Entity.belongsTo(sequelize.models['auditory'], { 
        foreignKey: { allowNull: true }, 
        onDelete: 'RESTRICT'
    });
}

module.exports.Init = Init;