'use strict';

const LessonsRepository = require('../repository/lessons');
const TimingsRepository = require('../repository/timings');

const helper = require('./controller-helper')('student');

module.exports.getDashboardPage = (req, res) => {

    let promises = {
        lessons: () => LessonsRepository.getTodayLessons(req.school_context.user.student.groupId)
    }

    let processors = {
        lessons: (lesson) => {
            return {
                auditory: lesson.auditory.name,
                subject: lesson.subject.shortname,
                start: TimingsRepository.toDomain(lesson.timing).start,
                end: TimingsRepository.toDomain(lesson.timing).end,
                teacher: `${lesson.teacher.user.lastname} ${lesson.teacher.user.firstname.charAt(0)}. ${lesson.teacher.user.middlename.charAt(0)}.`,
            }
        }
    }

    helper.processPromises(promises, processors)
        .then(lists => {
            let renderOptions = {
                view: 'student/dashboard',
                title: 'Сегодня',
            };

            helper.render(req, res, { lists }, renderOptions);
        });
}