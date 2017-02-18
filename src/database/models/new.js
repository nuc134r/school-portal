'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('new', {
        title: helper.nonEmptyString(128, "заголовок"),
        text: Sequelize.TEXT,
        //isImportant: Sequelize.BOOLEAN,
        //forAllGroups: Sequelize.BOOLEAN,
        //forAllTeachers: Sequelize.BOOLEAN
    },
        {
            instanceMethods: {
                getDisplayName: function () {
                    return this.title;
                }
            }
        });

    Entity.belongsToMany(sequelize.models['teacher'], { through: 'news_teachers' });
    Entity.belongsToMany(sequelize.models['group'], { through: 'news_groups' });
    Entity.belongsTo(sequelize.models.user, { 
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });
}

module.exports.Init = Init;