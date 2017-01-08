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
                return connection.models.teacher.create({ userId: user.id, canCreateNews: options.canCreateNews, canEditTimetable: options.canEditTimetable});
        }
    });

module.exports.browse = helper.browse;
module.exports.get = (options) => helper.get(options)
    .then(user => {
        if (user.type == 'student') {
            return connection.models["student"].find({
                where: { userId: user.id },
                include: connection.models.group
            })
            .then(student => {
                user.student = {
                    group: student.group.name,
                    groupId: student.group.id
                };

                return user;
            })
        }

        if (user.type == 'teacher') {
            return connection.models["teacher"].find({
                where: { userId: user.id }
            })
            .then(teacher => {
                user.teacher = teacher;

                return user;
            })
        }
    });

module.exports.update = (id, options) => {
    let update_values = options;

    return helper.update(id, options)
        .then(result => {
            let user = result[1][0];

            if (user.type == 'student') {
                let promise = connection.models["student"]
                    .update(
                        { groupId: update_values.groupId },
                        { where: { userId: user.id } }
                    );
                
                return promise;
            }

            if (user.type == 'teacher') {
                let promise = connection.models["teacher"]
                    .update(
                        { canCreateNews: update_values.canCreateNews, canEditTimetable: update_values.canEditTimetable },
                        { where: { userId: user.id } }
                    );
                
                return promise;
            }
        });
};

module.exports.delete = (options) => {
    if (options.id == 1) {
        return Promise.reject("Cannot delete root admin");
    } else {
        return helper.delete(options);
    }
}