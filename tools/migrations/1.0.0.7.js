'use strict';

const Sequelize = require('sequelize');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.changeColumn(
                'news',
                'text',
                {
                    type: Sequelize.TEXT,
                    allowNull: false
                }
            )
        ];
    },

    down: function (queryInterface, Sequelize) {
        return [
            queryInterface.changeColumn(
                'news',
                'text',
                {
                    type: Sequelize.TEXT
                }
            )
        ];
    }
};