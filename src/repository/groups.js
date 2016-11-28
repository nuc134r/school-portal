'use strict';

const database = require('../database/database');
const connection = database.getConnection();

module.exports.create = (options) => {
    return connection.models.group.create(options);
}
module.exports.browse = () => connection.models.group.findAll({
    include: connection.models.specialty
});

module.exports.get = (options) => connection.models.group.findOne({ where: options });