'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('test_result', {
        score: Sequelize.INTEGER
    });

    Entity.belongsTo(sequelize.models['test'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    Entity.belongsTo(sequelize.models['student']);
}

module.exports.Init = Init;