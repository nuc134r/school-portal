'use strict';

const database = require('../database/database');
const connection = database.getConnection();

module.exports.create = (options) => connection.models.user.create(options);
module.exports.browse = () => connection.models.user.findAll();