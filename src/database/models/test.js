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

    Entity.belongsTo(sequelize.models["subject"]);

    Entity.belongsTo(sequelize.models["user"]);

    Entity.hasMany(sequelize.models['test_result'], {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
    });

    Entity.belongsToMany(sequelize.models["group"], { through: 'tests_groups' });
}

module.exports.Init = Init;