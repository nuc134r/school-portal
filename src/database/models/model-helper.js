'use strict';

const Sequelize = require('sequelize');

module.exports = {
    nonEmptyString: (maxChars) => {
        return {
            type: maxChars ? Sequelize.STRING(maxChars) : Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: "#MANDATORYFIELD"
                }
            },
            allowNull: false
        }
    },
    nonEmptyUniqueString: (maxChars) => {
        return {
            type: maxChars ? Sequelize.STRING(maxChars) : Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: "#MANDATORYFIELD"
                }
            },
            allowNull: false,
            unique: true
        }
    }
}