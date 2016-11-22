'use strict';

const database = require('../database/database');
const connection = database.getConnection();

module.exports.create = (options) => connection.models.specialty.create(options);
module.exports.browse = () => {
    return connection.models.specialty.findAll();
}