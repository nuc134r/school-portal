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
module.exports.delete = (options) => {

    if (options.id == 1) {
        return Promise.reject("Cannot delete root admin");
    } else {
        return helper.get(options)
            .then((user) => {
                if (user.type == 'student') {
                    return connection.models['student']
                        .find({ where: { userId: user.id } })
                        .then(student => student.destroy())
                }
                return Promise.resolve();
            })
            .then(() => {
                return connection.models['user'].destroy({ where: options });
            })
    }
}