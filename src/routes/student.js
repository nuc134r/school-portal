'use strict';

let express = require('express');
let router = express.Router();

let renderer = require('../renderer')('student');

router.use((req, res, next) => {
    if (req.school_context.user.type != 'student') {
        res.redirect('..');
    } else {
        next();
    }
});

// GET /
router.get('/', function (req, res) {
    res.redirect('/student/dashboard');
});

// GET /student/dashboard
router.get('/dashboard', function (req, res) {
    let repository = req.school_context.repository;

    let params = {
        lessons: repository.lessons.getTodayLessons(),
        tasks: repository.tasks.getTasksShort(),
        group: repository.students.getMyGroupCompact()
    };

    renderer(req, res, params,
        {
            view: 'student/dashboard'
        });
});

// GET /student/lessons
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
            view: 'student/lessons'
        });
});

module.exports = router;