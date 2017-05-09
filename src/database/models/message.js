'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const moment = require('moment');

function Init(sequelize) {
    let Entity = sequelize.define('message', {
        text: Sequelize.TEXT
    });

    Entity.belongsTo(sequelize.models.user, {
        as: 'from',
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    Entity.belongsTo(sequelize.models.user, {
        as: 'to',
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });
}

module.exports.Init = Init;