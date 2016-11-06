'use strict';

const Sequelize = require('sequelize');

function Init(sequelize) {
    let User = sequelize.define('user', {

        login: { type: Sequelize.STRING, unique: true },
        password: Sequelize.STRING(32),

        firstname: Sequelize.STRING,
        middlename: Sequelize.STRING,
        lastname: Sequelize.STRING,

        //image

        type: Sequelize.ENUM('student', 'teacher', 'admin')
    },
        {
            instanceMethods: {
                asViewModel: function () {
                    return {
                        id: this.id,
                        image_id: null,
                        type: this.type,
                        roles: [],
                        name: {
                            first: this.firstname,
                            last: this.lastname,
                            middle: this.middlename
                        }
                    }
                }
            }
        });
}

module.exports.Init = Init;