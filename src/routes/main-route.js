var express = require('express');
var router = express.Router();

// GET /
router.get('/', function (req, res) {
    var arguments = { title: 'Студенческий портал' };

    arguments.lessons = req.repository.lessons.getTodayLessons(null);
    arguments.tasks = req.repository.tasks.getTasksShort(null);

    res.render('dashboard', arguments);
    res.end();
});

// GET /lessons
router.get('/lessons', function (req, res) {
    var arguments = { title: 'Расписание' };

    arguments.lessons = req.repository.lessons.getTodayLessons(null);

    res.render('lessons', arguments);
    res.end();
});

// GET /index.html
router.get('/index.html', function (req, res) {
    res.redirect(301, '/');
    res.end();
});

module.exports = router;