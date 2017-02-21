'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const utils = require('../utils');

const helper = require('./repository-helper')(connection, 'task');

module.exports.create = (options) => {
    return helper.create(options)
        .then(task => {
            let groupIds = utils.getArrayFromFormData(options, 'group');

            return connection.models['tasks_groups'].destroy({ where: { taskId: task.id } })
                .then(() => connection.models['tasks_groups'].bulkCreate(groupIds.map(function (id) { return { groupId: id, taskId: task.id } })))
        });
};
module.exports.browse = helper.browseWith(['group', 'subject']);

module.exports.get = (options) => {
    return connection
        .models['task']
        .find({
            where: { id: options.id },
            include: [
                connection.models['group'],
                connection.models['subject'],
                connection.models['user'],
                connection.models['task_comment']
            ]
        });
};

module.exports.getTasksForGroup = (groupId) => {
    return helper.browseWith(['group', 'subject'])()
        .then((tasks) => {
            let result = [];

            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];

                if (task.groups.filter((_) => _.id == groupId).length) {
                    result.push(task);
                }
            }

            return result;
        });
};

module.exports.delete = helper.delete;
module.exports.update = (id, options) => {
    return helper.update(id, options)
        .then(result => {
            let task = result[1][0];
            let groupIds = utils.getArrayFromFormData(options, 'group');

            return connection.models['tasks_groups'].destroy({ where: { taskId: task.id } })
                .then(() => connection.models['tasks_groups'].bulkCreate(groupIds.map(function (id) { return { groupId: id, taskId: task.id } })))
        });
};