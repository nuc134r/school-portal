'use strict';

const LessonsRepository = require('../repository/lessons');
const TimingsRepository = require('../repository/timings');
const NewsRepository = require('../repository/news');
const TasksRepository = require('../repository/tasks');
const Time = require('../repository/time');

const QuillRenderer = require('quill-render');
const moment = require('moment');

const utils = require('../utils');

const helper = require('./controller-helper')('student');

module.exports.getTimetablePage = (req, res) => {
    let promises = {
        lessons: () => LessonsRepository.getLessonsFor(req.school_context.user.student.groupId, Time.getWeekDays())
    }

    let processors = {
        lessons: (lesson) => {
            let locateResult = utils.locateLessonInTime(lesson);
            locateResult.isNow = locateResult.isNow && lesson.weekday == Time.getDayInfo().code;
            return {
                day: lesson.weekday,
                begins: locateResult.begins,
                ends: locateResult.ends,
                now: locateResult.isNow,
                auditory: lesson.auditory ? lesson.auditory.name : null,
                subject: lesson.subject.shortname,
                time: locateResult.isNow ? locateResult.timeleftString : lesson.timing.getDisplayName(),
                teacher: `${lesson.teacher.user.lastname} ${lesson.teacher.user.firstname.charAt(0)}. ${lesson.teacher.user.middlename.charAt(0)}.`,
            }
        }
    }

    helper.processPromises(promises, processors)
        .then(lists => {
            lists.lessons = lists.lessons.sort((a, b) => a.begins > b.begins);

            lists.weekdays = Time.getWeekDays();

            let renderOptions = {
                view: 'student/timetable',
                title: 'Расписание',
            };

            helper.render(req, res, {
                lists,
                week: Time.getWeekInfo(),
                today: Time.getDayInfo().code
            }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}

module.exports.getDashboardPage = (req, res) => {

    let promises = {
        lessons: () => LessonsRepository.getDayInfoLessons(req.school_context.user.student.groupId),
        news: () => NewsRepository.getNewsForStudent(req.school_context.user)
    }

    let processors = {
        lessons: (lesson) => {

            let locateResult = utils.locateLessonInTime(lesson);

            return {
                begins: locateResult.begins,
                ends: locateResult.ends,
                now: locateResult.isNow,
                auditory: lesson.auditory ? lesson.auditory.name : null,
                subject: lesson.subject.shortname,
                time: locateResult.isNow ? locateResult.timeleftString : lesson.timing.getDisplayName(),
                teacher: `${lesson.teacher.user.lastname} ${lesson.teacher.user.firstname.charAt(0)}. ${lesson.teacher.user.middlename.charAt(0)}.`,
            }
        },
        news: (entry) => {
            let createdMoment = moment(entry.createdAt);
            entry.createdDate = createdMoment.format('DD ') + createdMoment.format('MMMM').substr(0, 3);
            return entry;
        }
    }

    helper.processPromises(promises, processors)
        .then(lists => {
            lists.lessons = lists.lessons.sort((a, b) => a.begins > b.begins);
            lists.news = lists.news.sort((a, b) => +a.createdAt < +b.createdAt);

            let renderOptions = {
                view: 'student/dashboard',
                title: 'Сегодня',
            };

            helper.render(req, res, { lists, today: Time.getDayInfo().code }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}

module.exports.getTaskPage = (req, res) => {

    TasksRepository.get({ id: req.params['id'] })
        .then(task => {

            task.textHtml = QuillRenderer(JSON.parse(task.text).ops);

            let renderOptions = {
                view: 'common/task',
                title: 'Задание',
            };

            helper.render(req, res, { task }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}

module.exports.getTaskListPage = (req, res) => {

    let promises = {
        tasks: () => TasksRepository.getTasksForGroup(req.school_context.user.student.groupId)
    }

    helper.processPromises(promises, [])
        .then(lists => {

            let renderOptions = {
                view: 'common/tasks',
                title: 'Задания',
            };

            helper.render(req, res, { lists }, renderOptions);
        })
        .catch(error => {
            console.log(error);
            res.send(error.toString());
            res.end();
        });
}