-'use strict';

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

module.exports.browse = helper.browseWith(['group', 'subject']);
module.exports.get = helper.getWith(['subject']);
module.exports.delete = helper.delete;
module.exports.update = helper.update;

module.exports.browseForGroup = (userId, groupId) => {
    return connection
        .models['test']
        .findAll({
            include: [
                {
                    model: connection.models['group'],
                    where: { id: groupId }
                },
                {
                    model: connection.models['subject'],
                },
                {
                    model: connection.models['test_result'],
                    include: connection.models['user']
                }
            ]
        });
}


module.exports.saveTestResult = (id, userId, body) => {
    return connection
        .models['test']
        .findById(id)
        .then(test => {
            let score = 0;

            let questions = JSON.parse(test.questions);
            questions.forEach((question, i) => {
                if (body[`q${i}`] == `q${i}o0`) { score += (+question.score); }
            });

            return score;
        })
        .then(score => {
            return connection
                .models['test_result']
                .create({ testId: id, userId, score }, { returning: true });
        });
}