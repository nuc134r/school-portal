'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('new', {
        title: helper.nonEmptyString(128, "заголовок"),
        text: helper.nonEmptyString(null, "текст"),
        isImportant: Sequelize.BOOLEAN,
        forAllGroups: Sequelize.BOOLEAN,
        forAllTeachers: Sequelize.BOOLEAN
    },
        {
            instanceMethods: {
                getDisplayName: function () {
                    return this.title;
                }
            }
        });

    /*Entity.belongsTo(sequelize.models['image'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });*/
}

module.exports.Init = Init;