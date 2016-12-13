'use strict';

const moment = require('moment');

require('moment/locale/ru');

module.exports.getCurrentWeektype = () => {
    let now = moment();
    let month = now.month() + 1;

    let _1sep = (month >= 7)
        ? moment([now.year(), 8])
        : moment([now.year() - 1, 8]);

    _1sep.day("monday");
    now.subtract(1, 'd');

    let current_week = now.diff(_1sep, "weeks") + 1;

    return current_week % 2 ? 'upper' : 'lower';
};

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