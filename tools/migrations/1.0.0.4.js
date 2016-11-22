'use strict';

const helper = require('../../src/database/models/model-helper');
const Sequelize = require('sequelize');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.changeColumn(
                'specialties',
                'shortname',
                helper.nonEmptyString(32)
            )
        ];
    },

    down: function (queryInterface, Sequelize) {
        return [
            queryInterface.changeColumn(
                'specialties',
                'shortname',
                {
                    type: Sequelize.STRING(32)
                }
            )
        ];
    }
};