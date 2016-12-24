'use strict';

const moment = require('moment');

require('moment/locale/ru');

module.exports.getCurrentWeektype = () => {
    let now = moment();
    let month = now.month() + 1;

    let _1sep = (month >= 7)
        ? moment([now.year(), 8])
        : moment([now.year() - 1, 8]);

    _1sep.day('monday');
    now.subtract(1, 'd');

    let current_week = now.diff(_1sep, 'weeks') + 1;

    return current_week % 2 ? 'upper' : 'lower';
};

module.exports.getCurrentWeekDates = () => {
    let result = [];
    let weekdays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    let now = moment();

    for (let i = 0; i < weekdays.length; i++) {
        let day = moment().day(weekdays[i]);
        let humanizedDate = day.format('DD MMMM');

        if (day.isoWeekday() == now.isoWeekday()) {
            humanizedDate = 'сегодня';
        }

        if (day.isoWeekday() == now.isoWeekday() + 1) {
            humanizedDate = 'завтра';
        }

        result.push(humanizedDate);
    }

    return result;
}

module.exports.getCurrentWeekdayCode = () => {
    let day = moment().isoWeekday() - 1;

    return {
        0: 'mon',
        1: 'tue',
        2: 'wed',
        3: 'thu',
        4: 'fri',
        5: 'sat'
    }[day];
}