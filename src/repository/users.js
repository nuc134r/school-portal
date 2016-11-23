'use strict';

const database = require('../database/database');
const connection = database.getConnection();

module.exports.create = (options) => {
    return connection.models.user.create(options)
        .then(user => {
            if (user.type == "student") {
                return connection.models.student.create({ userId: user.id, groupId: options.groupId });
            }
        });
}
module.exports.browse = () => connection.models.user.findAll();