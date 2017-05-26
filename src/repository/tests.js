'use strict';

const database = require('../database/database');
const utils = require('../utils');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'test');

module.exports.create = (options) => {
    return helper.create(options)
        .then(task => {
            let groupIds = utils.getArrayFromFormData(options, 'group');

            return connection.models['tests_groups'].destroy({ where: { testId: task.id } })
                .then(() => connection.models['tests_groups'].bulkCreate(groupIds.map(function (id) { return { groupId: id, testId: task.id } })))
        });
};

module.exports.browse = helper.browseWith(['group']);
module.exports.get = helper.get;
module.exports.delete = helper.delete;
module.exports.update = helper.update;