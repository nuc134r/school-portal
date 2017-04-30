'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');
const SecurityManager = require('./../../security-manager');

function hashPassword(user) {
    if (user.password) {
        let passwordData = SecurityManager.hashPassword(user.password);

        user.password = passwordData.passwordHash;
        user.salt = passwordData.salt;
    }
}

function Init(sequelize) {
    let User = sequelize.define('user', {

        login: helper.nonEmptyUniqueString(32, "Логин"),
        password: { type: Sequelize.STRING(128), allowNull: false },
        salt: { type: Sequelize.STRING(16), allowNull: false },

        firstname: helper.nonEmptyString(64, "Имя"),
        middlename: Sequelize.STRING(64),
        lastname: helper.nonEmptyString(64, "Фамилия"),

        type: Sequelize.ENUM('student', 'teacher', 'admin'),

        image_id: Sequelize.STRING(64)
    },
        {
            hooks: {
                afterUpdate: function (user) {
                    require('../../session/sessions').invalidate(user);
                },
                beforeValidate: hashPassword
            },
            instanceMethods: {
                getDisplayName: function () {
                    return `${this.lastname} ${this.firstname}`;
                },
                getDisplayFullName: function () {
                    return `${this.lastname} ${this.firstname} ${this.middlename}`;
                },
                asViewModel: function () {
                    let result = {
                        id: this.id,
                        image_id: this.image_id,
                        type: this.type,
                        roles: [],
                        login: this.login,
                        name: {
                            first: this.firstname,
                            last: this.lastname,
                            middle: this.middlename
                        },
                        getImageUrls: function () {
                            if (this.image_id) {
                                return {
                                    'small': `/images/small/${this.image_id}`,
                                    'large': `/images/large/${this.image_id}`
                                }
                            }
                            return {
                                'small': '/empty_avatar_48.jpg',
                                'large': '/empty_avatar_128.jpg'
                            }

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