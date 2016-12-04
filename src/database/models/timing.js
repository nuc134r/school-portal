'use strict';

const Sequelize = require('sequelize');
const moment = require('moment');

const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('timing', {
        start: Sequelize.DATE,
        duration: Sequelize.INTEGER
    },
        {
            instanceMethods: {
                getDisplayName: function () {
                    let start = moment(this.start);
                    let end = start.add(this.duration, 'minutes');

                    return `${start.format('hh:mm')} - ${end.format('hh:mm')}`;
                }
            }
        });
}

module.exports.Init = Init;