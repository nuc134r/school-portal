'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Course = sequelize.define('course', {
        name: helper.nonEmptyString(64, "имя"),
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