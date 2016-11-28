'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'group');

module.exports.create = helper.create;
module.exports.browse = helper.browseWith(['specialty']);
module.exports.get = helper.get;