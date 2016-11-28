'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let User = sequelize.define('user', {

        login: helper.nonEmptyUniqueString(32, "Логин"),
        password: helper.nonEmptyString(32, "Пароль"),

        firstname: helper.nonEmptyString(64, "Имя"),
        middlename: Sequelize.STRING(64),
        lastname: helper.nonEmptyString(64, "Фамилия"),

        type: Sequelize.ENUM('student', 'teacher', 'admin')
    },
        {
            paranoid: true,
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