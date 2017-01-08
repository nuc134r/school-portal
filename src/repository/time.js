'use strict';

const moment = require('moment');
require('moment/locale/ru');

const WeekDays = [
    { code: 'mon', displayName: 'понедельник', shortDisplayName: 'пн' },
    { code: 'tue', displayName: 'вторник', shortDisplayName: 'вт' },
    { code: 'wed', displayName: 'среда', shortDisplayName: 'ср' },
    { code: 'thu', displayName: 'четверг', shortDisplayName: 'чт' },
    { code: 'fri', displayName: 'пятница', shortDisplayName: 'пт' },
    { code: 'sat', displayName: 'суббота', shortDisplayName: 'сб' },
    { code: 'sun', displayName: 'воскресенье', shortDisplayName: 'вс' }
];

module.exports.WeekDays = WeekDays;

module.exports.getWeekInfo = getWeekInfo;

function getFirstOfSeptember(now) {
    if (!now) now = moment();

    let month = now.month() + 1;
    return (month >= 7) ? moment([now.year(), 8]) : moment([now.year() - 1, 8]);
}

function getWeekInfo(now) {
    if (!now) now = moment();

    let firstOfSeptebmer = getFirstOfSeptember(now);

    let weekIndex = now.diff(firstOfSeptebmer, 'weeks') + 1;

    return { type: ((weekIndex % 2) ? 'upper' : 'lower'), index: weekIndex };
};

module.exports.getAcademicWeekDays = (now) => {
    if (!now) now = moment();
    let firstOfSeptember = getDayInfo(getFirstOfSeptember(now));

    let weekdays = WeekDays.slice(0, -1);

    while (weekdays[0].code != firstOfSeptember.code) {
        let last = weekdays.pop();
        weekdays.unshift(last);
    }

    return weekdays;
}

module.exports.getWeekDays = (options) => {
    //let isThisWeek = !options || !options.isNextWeek;
    //let humanize = (!options || options.humanize || true) && isThisWeek;

    let result = [];
    let now = moment();

    for (let i = 0; i < WeekDays.length; i++) {
        let day = moment().day(WeekDays[i].displayName);
        let displayDate = day.format('DD MMMM');

        //if (humanize) {
            if (day.isoWeekday() == now.isoWeekday()) {
                displayDate = 'сегодня';
            }

            if (day.isoWeekday() == now.isoWeekday() + 1) {
                displayDate = 'завтра';
            }
        //}
        result.push({ displayDate, moment: day, weekday: WeekDays[i], week: getWeekInfo(day) });
    }

    return result;
}

module.exports.getDayInfo = getDayInfo;
function getDayInfo (now) {
    if (!now) now = moment();
    let dayIndex = now.isoWeekday() - 1;

    return WeekDays[dayIndex];
}