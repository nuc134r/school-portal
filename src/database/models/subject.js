'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Subject = sequelize.define('subject', {
        name: helper.nonEmptyString(128, "имя"),
        shortname: helper.nonEmptyString(32, "короткое имя"),
    },
        {
            paranoid: true,
            instanceMethods: {
                getDisplayName: function () {
                    return this.name;
                }
            }
        });
}

module.exports.Init = Init;