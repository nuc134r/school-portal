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
            instanceMethods: {
                getDisplayName: function () {
                    return `${this.lastname} ${this.firstname}`;
                },
                asViewModel: function () {
                    let result = {
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

                    if (this.student) result.student = this.student;
                    if (this.teacher) result.teacher = this.teacher;
                    if (this.admin) result.admin = this.admin;

                    return result;
                }
            }
        });
}

module.exports.Init = Init;