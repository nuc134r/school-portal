'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let Entity = sequelize.define('test', {
        name: Sequelize.STRING(128),
        a_score: Sequelize.INTEGER,
        b_score: Sequelize.INTEGER,
        c_score: Sequelize.INTEGER,
        questions: Sequelize.JSON
    },
        {
            instanceMethods: {
                getDisplayName: function () {
                    return this.name;
                }
            }
        });

    Entity.belongsToMany(sequelize.models["group"], { through: 'tests_groups' });
}

module.exports.Init = Init;