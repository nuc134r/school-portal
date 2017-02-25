'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'new');

module.exports.create = (options) => {
    return helper
        .create(options)
        .then((instance) => {
            let groupRecievers = [];
            let teacherRecievers = [];

            for (let key in options) {
                if (~key.indexOf('group_')) {
                    let groupId = key.split('group_')[1];

                    groupRecievers.push({
                        groupId,
                        newId: instance.id
                    });
                }
                if (~key.indexOf('teacher_')) {
                    let teacherId = key.split('teacher_')[1];

                    teacherRecievers.push({
                        teacherId,
                        newId: instance.id
                    });
                }
            }

            return Promise.resolve()
                .then(connection.models['news_groups'].bulkCreate(groupRecievers))
                .then(connection.models['news_teachers'].bulkCreate(teacherRecievers))
                .then(() => instance);
        })
}

module.exports.browse = helper.browseWith(['user']);

module.exports.get = (options) => {
    return connection
        .models['new']
        .find({
            where: { id: options.id },
            include: [
                connection.models['group'],
                connection.models['teacher']
            ]
        });
};

module.exports.delete = helper.delete;

module.exports.update = function(id, options) {
    return helper
        .update(id, options)
        .then(function(instance) {
            instance = instance[1][0];

            let groupRecievers = [];
            let teacherRecievers = [];

            for (let key in options) {
                if (~key.indexOf('group_')) {
                    let groupId = key.split('group_')[1];

                    groupRecievers.push({
                        groupId,
                        newId: instance.id
                    });
                }
                if (~key.indexOf('teacher_')) {
                    let teacherId = key.split('teacher_')[1];

                    teacherRecievers.push({
                        teacherId,
                        newId: instance.id
                    });
                }
            }

            return Promise.resolve()
                .then(connection.models['news_groups'].destroy({ where: { newId: instance.id } }))
                .then(connection.models['news_teachers'].destroy({ where: { newId: instance.id } }))
                .then(connection.models['news_groups'].bulkCreate(groupRecievers))
                .then(connection.models['news_teachers'].bulkCreate(teacherRecievers));
        });
}

module.exports.getNewsForStudent = (user) => {
    return connection
        .models['new']
        .findAll({
            include: [
                connection.models['group']
            ]
        })
        .then(news => {
            let result = [];

            for(let i = 0; i < news.length; i++) {
                let newEntry = news[i];
                if (newEntry.groups.filter(_ => _.id == user.student.groupId).length) {
                    result.push(newEntry);
                }
            }

            return result;
        })
}