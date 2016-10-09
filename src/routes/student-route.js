'use strict';

let express = require('express');
let router = express.Router();

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
    let params = { title: 'Студенческий портал', user: req.school_context.user };

    let repository = req.school_context.repository;

    params.lessons = repository.lessons.getTodayLessons();
    params.tasks = repository.tasks.getTasksShort();
    params.group = repository.students.getMyGroupCompact();

    res.render('dashboard', params);
    res.end();
});

// GET /lessons
router.get('/lessons', function (req, res) {
    let params = { title: 'Расписание' };

    let repository = req.school_context.repository;

    params.lessons = repository.lessons.getWeekLessons(null);
    params.today = {
        day: repository.time.getWeekDay(),
        week: repository.time.getWeek(true)
    };

    res.render('lessons', params);
    res.end();
});

module.exports = router;