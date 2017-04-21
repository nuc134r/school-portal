'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const utils = require('../utils');

const helper = require('./repository-helper')(connection, 'user');

module.exports.updateImageId = (req, imageId) => {
    return helper.update(req.school_context.user.id, { image_id: imageId });
}

module.exports.create = (options) => helper.create(options)
    .then(user => {
        switch (user.type) {
            case "student":
                let student_options = { userId: user.id };
                Object.assign(student_options, options);
                return connection.models.student.create(student_options);
            case "teacher":
                let teacher_options = { userId: user.id };
                Object.assign(teacher_options, options);
                return connection.models.teacher.create(teacher_options)
                    .then(teacher => {
                        let subjectIds = utils.getArrayFromFormData(options, 'subject');

                        return Promise.resolve()
                            .then(connection.models['teachers_subjects'].destroy({ where: { teacherId: teacher.id } }))
                            .then(connection.models['teachers_subjects'].bulkCreate(subjectIds.map(function (id) { return { subjectId: id, teacherId: teacher.id } })))
                            .then(() => teacher);
                    });
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
                include: connection.models["subject"],
                where: { userId: user.id }
            })
                .then(teacher => {
                    user.teacher = teacher;

                    return user;
                })
        }
    });

module.exports.update = (id, options) => {
    return helper.update(id, options)
        .then(result => {
            let user = result[1][0];

            if (user.type == 'student') {
                return connection.models["student"]
                    .update({ groupId: options.groupId }, { where: { userId: user.id } });
            }

            if (user.type == 'teacher') {
                return connection.models["teacher"]
                    .update(options, { where: { userId: user.id }, returning: true })
                    .then(result => {
                        let teacher = result[1][0];
                        let subjectIds = utils.getArrayFromFormData(options, 'subject');

                        return connection.models['teachers_subjects'].destroy({ where: { teacherId: teacher.id } })
                            .then(() => connection.models['teachers_subjects'].bulkCreate(subjectIds.map(function (id) { return { subjectId: id, teacherId: teacher.id } })))
                    });
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