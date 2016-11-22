'use strict';

const helper = require('../../src/database/models/model-helper');
const Sequelize = require('sequelize');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.addColumn(
                'specialties',
                'shortname',
                Sequelize.STRING(32)
            )
        ];
    },

    down: function (queryInterface, Sequelize) {
        return [
            queryInterface.removeColumn('specialties', 'shortname')
        ];
    }
};