'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'subject');

module.exports.create = helper.create;
module.exports.browse = helper.browse;
module.exports.get = helper.get;
module.exports.delete = helper.delete;
module.exports.update = helper.update;