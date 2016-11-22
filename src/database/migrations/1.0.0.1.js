'use strict';

const helper = require('./model-helper');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.addColumn(
                'specialty',
                'shortname',
                helper.nonEmptyString(32)
            )
        ];
    },

    down: function (queryInterface, Sequelize) {
        return [
            queryInterface.removeColumn('specialty', 'shortname')
        ];
    }
};