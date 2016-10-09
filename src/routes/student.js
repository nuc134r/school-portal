'use strict';

let express = require('express');
let router = express.Router();

let renderer = require('../renderer');

// GET /
router.get('/', function (req, res) {
    res.redirect(301, '/dashboard');
    res.end();
});

// GET /index.html
router.get('/index.html', function (req, res) {
    res.redirect(301, '/dashboard');
    res.end();
});

// GET /dashboard
router.get('/dashboard', function (req, res) {
    let repository = req.school_context.repository;

    let params = {
        lessons: repository.lessons.getTodayLessons(),
        tasks: repository.tasks.getTasksShort(),
        group: repository.students.getMyGroupCompact()
    };

    renderer.render(req, res, 'dashboard', 'Студенческий портал', params);
});

// GET /lessons
router.get('/lessons', function (req, res) {
    let repository = req.school_context.repository;

    let params = {
        lessons: repository.lessons.getWeekLessons(null),
        today: {
            day: repository.time.getWeekDay(),
            week: repository.time.getWeek(true)
        }
    }

    renderer.render(req, res, 'lessons', 'Расписание', params);
});

module.exports = router;