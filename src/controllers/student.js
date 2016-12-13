'use strict';

const LessonsRepository = require('../repository/lessons');
const TimingsRepository = require('../repository/timings');
const Time = require('../repository/time');

const helper = require('./controller-helper')('student');

module.exports.getDashboardPage = (req, res) => {

    let promises = {
        lessons: () => LessonsRepository.getTodayLessons(req.school_context.user.student.groupId)
    }

    let processors = {
        lessons: (lesson) => {
            let dateNow = new Date;
            let now = dateNow.getHours() * 60 + dateNow.getMinutes();

            let begins = lesson.timing.start.getHours() * 60 + lesson.timing.start.getMinutes();
            let ends = begins + lesson.timing.duration;

            let isLessonNow = begins <= now && now < ends;

            return {
                now: isLessonNow,
                auditory: lesson.auditory.name,
                subject: lesson.subject.shortname,
                time: isLessonNow ? `осталось ${ends - now} мин` : lesson.timing.getDisplayName(),
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