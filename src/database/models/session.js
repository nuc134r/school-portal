'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Session = sequelize.define('session', {
        token: helper.nonEmptyString(32, "")
    });

    Session.belongsTo(sequelize.models.user);
}

module.exports.Init = Init;