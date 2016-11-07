'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Course = sequelize.define('course', {
        name: helper.nonEmptyString(64),
    });
}

module.exports.Init = Init;