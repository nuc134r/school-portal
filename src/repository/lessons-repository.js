'use strict';

function CreateRepository(db, user) {
    this.getTodayLessons = () => {

        return lessonsMock;
    }
}

module.exports = CreateRepository;









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
        room: 'Спортзал',
        now: true
    },
    {
        subject: 'Разработка баз данных',
        tutor: 'Ларионова Е.А.',
        starts: '8:30',
        ends: '10:00',
        room: '405'
    },
    {
        subject: 'Системное программирование',
        tutor: 'Бунькин В.И.',
        starts: '11:50',
        ends: '13:40',
        room: '105a'
    }
];