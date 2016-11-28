'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Specialty = sequelize.define('specialty', {
        name: helper.nonEmptyString(128, "имя"),
        shortname: helper.nonEmptyString(32, "короткое имя")
    }, helper.defaultOptions);
}

module.exports.Init = Init;