'use strict';

let express = require('express');
let router = express.Router();

let renderer = null; //require('../renderer')('student');

router.use((req, res, next) => {
    if (req.school_context.user.type != 'student') {
        res.redirect('..');
    } else {
        next();
    }
});

// GET /
router.get('/', (req, res) => res.redirect('/s/dashboard'));

// GET /s/dashboard
router.get('/dashboard', function (req, res) {
    let repository = req.school_context.repository;

    let params = {
        lessons: repository.lessons.getTodayLessons(),
        tasks: repository.tasks.getTasksShort(),
        group: repository.students.getMyGroupCompact()
    };

    renderer(req, res, params,
        {
            view: 'student/dashboard',
            title: 'Сегодня'
        });
});

// GET /s/lessons
router.get('/lessons', function (req, res) {
    let repository = req.school_context.repository;

    let params = {
        lessons: repository.lessons.getWeekLessons(null),
        today: {
            day: repository.time.getWeekDay(),
            week: repository.time.getWeek(true)
        }
    }

    renderer(req, res, params,
        {
            view: 'student/lessons',
            title: 'Расписание'
        });
});

module.exports = router;