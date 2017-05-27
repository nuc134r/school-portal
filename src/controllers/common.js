'use strict';

const fs = require('fs');
const path = require('path');

const moment = require('moment');
const gm = require('gm');
const ImageMagick = gm.subClass({ imageMagick: true });
const QuillRenderer = require('quill-render');
const UUID = require('node-uuid');

const UsersRepository = require('../repository/users');
const TasksRepository = require('../repository/tasks');
const TestsRepository = require('../repository/tests');
const GroupsRepository = require('../repository/groups');
const TeachersRepository = require('../repository/teachers');
const MessagesRepository = require('../repository/messages');

function getHelper(req) {
    return require('./controller-helper')(req.school_context.user.type);
}

module.exports.getTaskResultPage = (req, res) => {
    TasksRepository.get({ resultId: req.params['id'] }, req.school_context.user)
        .then(taskResult => {

            taskResult.task.textHtml = QuillRenderer(JSON.parse(taskResult.task.text).ops);

            if (taskResult.comments) {
                taskResult.comments.forEach(_ => {
                    _.textHtml = QuillRenderer(JSON.parse(_.text).ops)
                    _.createdAtDisplay = moment(_.createdAt).format('LLL')
                });
            }

            let renderOptions = {
                view: 'teacher/task_result',
                title: 'Задание',
            };

            getHelper(req).render(req, res, { taskResult }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}

module.exports.getTaskPage = (req, res) => {

    TasksRepository.get({ id: req.params['id'] }, req.school_context.user)
        .then(task => {

            task.textHtml = QuillRenderer(JSON.parse(task.text).ops);
            if (task.comments) {
                task.comments.forEach(_ => {
                    _.textHtml = QuillRenderer(JSON.parse(_.text).ops)
                    _.createdAtDisplay = moment(_.createdAt).format('LLL')
                });
            }
            if (task.results) {
                task.results.forEach(_ => {
                    _.createdAtDisplay = moment(_.createdAt).format('LLL')
                    _.updatedAtDisplay = moment(_.createdAt).format('LLL')
                });
            }

            let usertype = req.school_context.user.type;

            let renderOptions = {
                view: usertype + '/task',
                title: 'Задание',
            };

            getHelper(req).render(req, res, { task }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}

module.exports.getTaskListPage = (req, res) => {
    let promises = {};

    let usertype = req.school_context.user.type;

    if (usertype == 'student') {
        promises.tasks = () => TasksRepository.getTasksForGroup(req.school_context.user.id, req.school_context.user.student.groupId)
    } else {
        promises.tasks = () => TasksRepository.getTasksForTeacher(req.school_context.user.id)
    }

    getHelper(req).processPromises(promises, [])
        .then(lists => {

            let list1 = [],
                list2 = [];

            if (usertype == 'student') {
                list1 = lists.tasks.filter(task => !task.results[0] || task.results[0].state == 'todo' || task.results[0].state == 'needsRevision');
                list2 = lists.tasks.filter(task => task.results[0] && (task.results[0].state == 'done' || task.results[0].state == 'sent'));
            } else {
                list1 = lists.tasks;
                list2 = lists.tasks.filter(task => task.results && task.results.some((_ => _.state == 'sent')));
            }

            let renderOptions = {
                view: usertype + '/tasks' + (usertype == 'teacher' ? '_review' : ''),
                title: 'Задания',
            };

            getHelper(req).render(req, res, { list1, list2 }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}

module.exports.getProfilePage = (req, res) => {
    const helper = getHelper(req);

    let renderOptions = {
        view: 'common/profile',
        title: 'Профиль',
    };

    UsersRepository.get({ id: req.params.user_id })
        .then(user => {
            helper.render(req, res, { profile_user: user }, renderOptions)
        })
        .catch(error => helper.render(req, res, { error: { message: 'Такого пользователя не существует' } }, { view: 'error' }));
}

module.exports.getGroupPage = (req, res) => {
    const helper = getHelper(req);

    let renderOptions = {
        view: 'common/group',
        title: 'Группа',
    };

    GroupsRepository.getWithStudents({ id: req.params.group_id })
        .then(group => {
            helper.render(req, res, { group }, renderOptions);
        })
        .catch(error => helper.render(req, res, { error: { message: 'Такой группы не существует' } }, { view: 'error' }));
}

module.exports.getAllGroupsPage = (req, res) => {
    const helper = getHelper(req);

    let renderOptions = {
        view: 'common/groups',
        title: 'Группы',
    };

    let data = {};

    GroupsRepository.browseWithStudents()
        .then(groups => {
            data.groups = groups;
            return TeachersRepository.browse();
        })
        .then(teachers => {
            data.teachers = teachers;
            helper.render(req, res, data, renderOptions)
        });
}

module.exports.getChatPage = (req, res) => {
    const helper = getHelper(req);

    let renderOptions = {
        view: 'common/chat',
        title: 'Диалог',
    };

    let fromId = req.school_context.user.id;
    let toId = req.params.user_id;

    let data = {};

    MessagesRepository.getHistory(fromId, toId)
        .then(messages => {
            data.messages = messages;
            return UsersRepository.get({ id: toId })
        })
        .then(to_user => {
            data.to_user = to_user;
            helper.render(req, res, data, renderOptions)
        });
}

module.exports.getChatListPage = (req, res) => {
    const helper = getHelper(req);

    let renderOptions = {
        view: 'common/chats',
        title: 'Диалоги',
    };

    MessagesRepository
        .getChats(req.school_context.user.id)
        .then(chats => {
            helper.render(req, res, { chats }, renderOptions);
        });
}

module.exports.getSettingsPage = (req, res) => {
    const helper = getHelper(req);

    let settings = "";

    let renderOptions = {
        view: 'common/settings',
        title: 'Настройки',
    };

    helper.render(req, res, { settings }, renderOptions);
}

module.exports.savePassword = (req, res) => {
    const helper = getHelper(req);

    if (req.body['password'] != req.body['confirmation']) {
        res.redirect('/settings?error=pwd_wrong_confirmation');
        return;
    }

    UsersRepository
        .updatePassword(req.school_context.user.id, req.body['password'])
        .then(() => res.redirect('/settings?message=pwd_ok'))
        .catch(() => res.redirect('/settings?error=pwd_not_secure'));
}

module.exports.saveProfileImage = (req, res) => {
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        let imageId = UUID().replace(/-/g, '');

        let oldImageId = req.school_context.user.image_id;
        if (oldImageId) {
            let smallFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${oldImageId}_48.jpg`);
            let largeFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${oldImageId}_128.jpg`);

            fs.unlink(smallFilePath, (err) => { if (err) console.log(err); });
            fs.unlink(largeFilePath, (err) => { if (err) console.log(err); });
        }

        UsersRepository.updateImageId(req, imageId).then(() => {

            let tempFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${imageId}.tmp`);
            let smallFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${imageId}_48.jpg`);
            let largeFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${imageId}_128.jpg`);

            let fstream = fs.createWriteStream(tempFilePath);

            fstream.on('finish', function () {

                ImageMagick(mimetype == 'image/gif' ? tempFilePath + '[0]' : tempFilePath)
                    .geometry(48, 48, '^')
                    .write(smallFilePath, (err) => {
                        if (err) {
                            console.log(err);
                            res.redirect('/settings?message=error');
                            return;
                        }

                        ImageMagick(mimetype == 'image/gif' ? tempFilePath + '[0]' : tempFilePath)
                            .geometry(128, 128, '^')
                            .write(largeFilePath, (err) => {
                                if (err) {
                                    console.log(err);
                                    res.redirect('/settings?message=error');
                                    return;
                                }

                                fs.unlink(tempFilePath, (err) => { if (err) console.log(err); });
                                res.redirect('/settings');
                            });
                    })
            });

            file.pipe(fstream);
        });
    });
}

module.exports.getSmallProfileImage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'user-images', `${req.params.image_id}_48.jpg`));
}


module.exports.getLargeProfileImage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'user-images', `${req.params.image_id}_128.jpg`));
}