var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res) {
    var arguments = { title: 'Студенческий портал' };

    arguments.articles = [
        {
            title: 'Акция «На работу на велосипеде» 20 мая 2016 г.',
            text: '20 Мая Департамент транспорта города Москвы рекомендует студентам и сотрудникам добраться в этот день на работу или на учебу на велосипеде.',
            time: 'сегодня, 15:39'
        }
    ];

    arguments.todayDay = "среда";
    arguments.tomorrowDay = "четверг";

    arguments.todayWeek = "нижняя";
    arguments.tomorrowWeek = "нижняя";

    arguments.lessonsToday = [
        {
            teacher: 'Ларионова Е.А.',
            name: 'Разработка баз данных',
            starts: '8:30',
            ends: '10:00',
            classroom : '105a'
        },
        {
            teacher: 'Соловьёв Л.И.',
            name: 'Физическая культура',
            starts: '10:10',
            ends: '11:40',
            classroom : 'Спортзал',
            now: true
        },
        {
            teacher: 'Бунькин В.И.',
            name: 'Системное программирование',
            starts: '11:50',
            ends: '13:40',
            classroom : '103'
        },
        {
            teacher: 'Глускер А.И.',
            name: 'Прикладное программирование',
            starts: '13:50',
            ends: '15:20',
            classroom : '405'
        }
    ];

    arguments.lessonsTomorrow = [
        {
            teacher: 'Соловьёв Л.И.',
            name: 'Физическая культура',
            starts: '10:10',
            ends: '11:40',
            classroom : 'Спортзал'
        },
        {
            teacher: 'Бунькин В.И.',
            name: 'Системное программирование',
            starts: '11:50',
            ends: '13:40',
            classroom : '103'
        },
        {
            teacher: 'Глускер А.И.',
            name: 'Прикладное программирование',
            starts: '13:50',
            ends: '15:20',
            classroom : '405'
        }
    ];

    res.render('dashboard', arguments);
    res.end();
});

// GET /index.html
router.get('/index.html', function(req, res) {
    res.redirect(301, '/');
    res.end();
});

// GET /timetable
router.get('/timetable', function(req, res) {
    var arguments = { title: 'Расписание' };

    arguments.todayDay = "среда";
    arguments.tomorrowDay = "четверг";

    arguments.todayWeek = "нижняя";
    arguments.tomorrowWeek = "нижняя";

    arguments.lessonsToday = [
        {
            teacher: 'Ларионова Е.А.',
            name: 'Разработка баз данных',
            starts: '8:30',
            ends: '10:00',
            classroom : '105a'
        },
        {
            teacher: 'Соловьёв Л.И.',
            name: 'Физическая культура',
            starts: '10:10',
            ends: '11:40',
            classroom : 'Спортзал',
            now: true
        },
        {
            teacher: 'Бунькин В.И.',
            name: 'Системное программирование',
            starts: '11:50',
            ends: '13:40',
            classroom : '103'
        },
        {
            teacher: 'Глускер А.И.',
            name: 'Прикладное программирование',
            starts: '13:50',
            ends: '15:20',
            classroom : '405'
        }
    ];

    arguments.lessonsTomorrow = [
        {
            teacher: 'Соловьёв Л.И.',
            name: 'Физическая культура',
            starts: '10:10',
            ends: '11:40',
            classroom : 'Спортзал'
        },
        {
            teacher: 'Бунькин В.И.',
            name: 'Системное программирование',
            starts: '11:50',
            ends: '13:40',
            classroom : '103'
        },
        {
            teacher: 'Глускер А.И.',
            name: 'Прикладное программирование',
            starts: '13:50',
            ends: '15:20',
            classroom : '405'
        }
    ];

    res.render('timetable', arguments);
    res.end();
});

module.exports = router;