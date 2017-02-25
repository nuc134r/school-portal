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
module.exports.browse = (user) => helper.browseWith(['group', 'subject'], { userId: user.teacher.id })();

module.exports.get = (options, user) => {
    return connection
        .models['task']
        .find({
            where: { id: options.id },
            include: [
                connection.models['group'],
                connection.models['subject'],
                connection.models['user']
            ]
        })
        .then(task => {
            if (user) {
                return task.getResults({ where: { userId: user.id } })
                    .then(results => {
                        if (results.length) {
                            task.result = results[0];
                            return task.result.getComments({ include: connection.models['user'] });
                        } else {
                            return [];
                        }
                    })
                    .then(comments => {
                        task.comments = comments;
                        return task;
                    })
            } else {
                return task;
            }
        });
};

module.exports.getTasksForGroup = (groupId) => {
    return helper.browseWith(['group', 'subject'], {}, [{ model: connection.models['task_result'], as: 'results' }])()
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

module.exports.getTasksForTeacher = (userId) => {
    return helper.browseWith(['group', 'subject'], { userId }, [{ model: connection.models['task_result'], as: 'results' }])();
};

module.exports.saveTaskSolution = (taskId, userId, options) => {
    return connection
        .models['task_result']
        .findOrCreate({ where: { taskId, userId }, defaults: { taskId, userId, state: 'sent', hasMark: false } })
        .then(result => {
            let taskResult = result[0];
            let created = result[1];
            if (created) {
                return taskResult;
            } else {
                taskResult.set('state', 'sent');
                return taskResult.save().then(() => taskResult);
            }
        })
        .then(taskResult => {
            return connection
                .models['task_comment']
                .create({ userId, text: options.text, hasMark: false, taskResultId: taskResult.id });
        })
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