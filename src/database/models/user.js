'use strict';

const Sequelize = require('sequelize');
const helper = require('./model-helper');

function Init(sequelize) {
    let User = sequelize.define('user', {

        login: helper.nonEmptyUniqueString(32),
        password: helper.nonEmptyString(32),

        firstname: helper.nonEmptyString(64),
        middlename: Sequelize.STRING(64),
        lastname: helper.nonEmptyString(64),

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