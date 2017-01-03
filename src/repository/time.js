'use strict';

const moment = require('moment');
require('moment/locale/ru');

const WeekDays = [
    { code: 'mon', displayName: 'понедельник' },
    { code: 'tue', displayName: 'вторник' },
    { code: 'wed', displayName: 'среда' },
    { code: 'thu', displayName: 'четверг' },
    { code: 'fri', displayName: 'пятница' },
    { code: 'sat', displayName: 'суббота' }
];

module.exports.WeekDays = WeekDays;

module.exports.getCurrentWeek = (now) => {
    if (!now) now = moment();
    let month = now.month() + 1;

    let _1sep = (month >= 7)
        ? moment([now.year(), 8])
        : moment([now.year() - 1, 8]);

    let weekIndex = now.diff(_1sep, 'weeks') + 1;

    return { type: ((weekIndex % 2) ? 'upper' : 'lower'), index: weekIndex };
};

module.exports.getCurrentWeekDays = () => {
    let result = [];
    let now = moment();

    for (let i = 0; i < WeekDays.length; i++) {
        let day = moment().day(WeekDays[i].displayName);
        let displayDate = day.format('DD MMMM');

        if (day.isoWeekday() == now.isoWeekday()) {
            displayDate = 'сегодня';
        }

        if (day.isoWeekday() == now.isoWeekday() + 1) {
            displayDate = 'завтра';
        }

        result.push(displayDate);
    }

    return result;
}

module.exports.getToday = () => {
    let dayIndex = moment().isoWeekday() - 1;

    return WeekDays[dayIndex];
}