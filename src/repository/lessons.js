'use strict';

function CreateRepository(db, user) {
    this.getTodayLessons = () => {

        return lessonsMock;
    }

    this.getWeekLessons = () => {

        let result = {
            current: [],
            upper: [],
            lower: []
        };

        for (let i = 0; i < 6; i++) {
            let num = getRandomInt(0, 5);

            let day = [];

            for (let i = 0; i < num; i++) {
                day.push(lessonsMock[getRandomInt(0, lessonsMock.length - 1)]);
            }

            result.current.push(day);
        }

        for (let i = 0; i < 6; i++) {
            let num = getRandomInt(0, 5);

            let day = [];

            for (let i = 0; i < num; i++) {
                day.push(lessonsMock[getRandomInt(0, lessonsMock.length - 1)]);
            }

            result.upper.push(day);
        }

        for (let i = 0; i < 6; i++) {
            let num = getRandomInt(0, 5);

            let day = [];

            for (let i = 0; i < num; i++) {
                day.push(lessonsMock[getRandomInt(0, lessonsMock.length - 1)]);
            }

            result.lower.push(day);
        }

        return result;
    }
}

module.exports = CreateRepository;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let lessonsMock = [
    {
        subject: 'Разработка базы данных',
        tutor: 'Ларионова Е.А.',
        starts: '8:30',
        ends: '10:00',
        room: '405'
    },
    {
        subject: 'Физическая культура',
        tutor: 'Соловьёв Л.И.',
        starts: '10:10',
        ends: '11:40',
        room: 'Спортзал'
    },
    {
        subject: 'Системное программирование',
        tutor: 'Бунькин В.И.',
        starts: '11:50',
        ends: '13:40',
        room: '105a'
    }
];