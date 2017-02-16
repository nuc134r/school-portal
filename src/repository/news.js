'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'new');

module.exports.create = (options) => {
    return helper.create(options);
}
module.exports.browse = helper.browse;
module.exports.get = helper.get;
module.exports.delete = helper.delete;
module.exports.update = helper.update;


module.exports.getNewsForStudent = (student) => {
    return helper.browse();
}