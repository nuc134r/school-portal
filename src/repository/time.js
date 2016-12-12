'use strict';

let moment = require('moment');
require('moment/locale/ru');

function CreateRepository() {
    this.getWeekDay = () => {
        return moment().isoWeekday() - 1;
    }

    this.getWeek = (as_text) => {
        let now = moment();
        let month = now.month() + 1;

        let _1sep = (month >= 7)
            ? moment([now.year(), 8])
            : moment([now.year() - 1, 8]);

        _1sep.day("monday");
        now.subtract(1, 'd');

        let current_week = now.diff(_1sep, "weeks") + 1;

        if (as_text) {
            return current_week % 2 ? "верхняя" : "нижняя";
        }

        return current_week;
    }
}

module.exports.getCurrentWeektype = () => {
    let now = moment();
    let month = now.month() + 1;

    let _1sep = (month >= 7)
        ? moment([now.year(), 8])
        : moment([now.year() - 1, 8]);

    _1sep.day("monday");
    now.subtract(1, 'd');

    let current_week = now.diff(_1sep, "weeks") + 1;

    /*if (as_text) {
        return current_week % 2 ? "верхняя" : "нижняя";
    }*/

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