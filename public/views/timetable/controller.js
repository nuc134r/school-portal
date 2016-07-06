'use strict';

angular.module('portal-app').controller('timetableController', function TimetableController($scope) {
    $scope.todayDay = "среда";
    $scope.tomorrowDay = "четверг";

    $scope.todayWeek = "нижняя";
    $scope.tomorrowWeek = "нижняя";

    $scope.lessonsToday = [
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

    $scope.lessonsTomorrow = [
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
            classroom : '107б'
        },
        {
            teacher: 'Глускер А.И.',
            name: 'Прикладное программирование',
            starts: '13:50',
            ends: '15:20',
            classroom : '405'
        }
    ];
});