'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Specialty = sequelize.define('specialty', {
        name: helper.nonEmptyString(128),
        shortname: helper.nonEmptyString(32),
    });
}

module.exports.Init = Init;