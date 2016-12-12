'use strict';

const LessonsRepository = require('../repository/lessons');

const helper = require('./controller-helper')('student');

module.exports.getDashboardPage = (req, res) => {

    LessonsRepository.getTodayLessons(req.school_context.user.student.groupId)
        .then(lessons => {
            let renderOptions = {
                view: 'student/dashboard',
                title: 'Сегодня',
            };

            helper.render(req, res, { lessons }, renderOptions);
        })


}