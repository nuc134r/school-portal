'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('auditory', {
        name: helper.nonEmptyString(8, "имя")
    },
        {
            instanceMethods: {
                getDisplayName: function () {
                    return this.name;
                }
            }
        });
}

module.exports.Init = Init;