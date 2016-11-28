'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'user');

module.exports.create = (options) => helper.create(options)
    .then(user => {
        switch (user.type) {
            case "student":
                return connection.models.student.create({ userId: user.id, groupId: options.groupId });
            case "teacher":
                break;
        }
    });

module.exports.browse = helper.browse;
module.exports.get = helper.get;