'use strict';

function CreateRepository(db, user) {
    this.getTasksShort = () => {

        return tasksMock;
    }
}

module.exports = CreateRepository;






let tasksMock = [
    {
        title: 'Курсовой проект',
        subject: 'Разработка базы данных',
        details: '2 из 5'
    },
    {
        title: 'Практическая работа №2',
        subject: 'Прикладное программирование',
        details: null
    },
    {
        title: 'Самостоятельная работа №3',
        subject: 'Мат. методы в программировании',
        details: null
    }
];