var express = require('express');
var router = express.Router();

// GET /
router.get('/', function (req, res) {
    var arguments = { title: 'Студенческий портал' };

    arguments.lessons = req.repository.lessons.getTodayLessons(null);
    arguments.tasks = req.repository.tasks.getTasksShort(null);

    res.render('material', arguments);
    res.end();
});

// GET /index.html
router.get('/index.html', function (req, res) {
    res.redirect(301, '/');
    res.end();
});

module.exports = router;