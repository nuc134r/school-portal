'use strict';

let express = require('express');
let router = express.Router();

let renderer = require('../renderer')('teacher');

router.use((req, res, next) => {
    if (req.school_context.user.type != 'teacher') {
        res.redirect('..');
    } else {
        next();
    }
});

// GET /
router.get('/', function (req, res) {
    res.redirect('/t/dashboard');
});

// GET /t/dashboard
router.get('/dashboard', function (req, res) {
    let repository = req.school_context.repository;

    let params = {
        lessons: repository.lessons.getTodayLessons(),
        tasks: repository.tasks.getTasksShort(),
        group: repository.students.getMyGroupCompact()
    };

    renderer(req, res, params,
        {
            view: 'teacher/dashboard',
            title: 'Сегодня'
        });
});

module.exports = router;