'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('test_result', {
        score: Sequelize.INTEGER
    });

    Entity.belongsTo(sequelize.models['user']);
}

module.exports.Init = Init;