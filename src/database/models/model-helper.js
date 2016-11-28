'use strict';

const Sequelize = require('sequelize');

module.exports = {
    nonEmptyString: (maxChars, fieldName) => {
        return {
            type: maxChars ? Sequelize.STRING(maxChars) : Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: fieldName.toLowerCase()
                }
            },
            allowNull: false
        }
    },
    nonEmptyUniqueString: (maxChars, fieldName) => {
        return {
            type: maxChars ? Sequelize.STRING(maxChars) : Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: fieldName.toLowerCase()
                }
            },
            allowNull: false,
            unique: true
        }
    },
    defaultOptions: {
        paranoid: true
    }
}