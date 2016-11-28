'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'specialty');

module.exports.create = helper.create;
module.exports.browse = helper.browse;
module.exports.get = helper.get;