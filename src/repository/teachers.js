'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'teacher');

module.exports.browse = helper.browseWith(['user']);