'use strict';

const Sequelize = require('sequelize');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.addColumn(
                'news',
                'authorId',
                {
                    references: { model: 'user', key: 'id' },
                    type: Sequelize.INTEGER,
                    allowNull : false,
                    onDelete: 'CASCADE'
                }
            )
        ];
    }
};