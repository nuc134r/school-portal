'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'group');

module.exports.create = helper.create;
module.exports.browse = helper.browseWith(['specialty']);
module.exports.get = helper.get;
module.exports.delete = helper.delete;
module.exports.update = helper.update;

module.exports.browseWithStudents = function () {
    return connection
        .models['group']
        .findAll({
            include: [
                {
                    model: connection.models['student'],
                    include: [
                        {
                            model: connection.models['user']
                        }
                    ]
                },
                {
                    model: connection.models['specialty']
                }
            ],
            order: 'name'
        });
}