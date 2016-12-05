'use strict';

const moment = require('moment');

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'timing');

function toDomain(timing) {
    let start = moment(timing.start);
    let end = moment(start).add(timing.duration, 'minutes');

    let displayStart = start.format('k:mm');
    let displayEnd = end.format('k:mm');

    return {
        id: timing.id,
        getDisplayName: () => `${displayStart} - ${displayEnd}`,
        start: displayStart,
        end: displayEnd,
        duration: end.diff(start, 'minutes')
    }
}

function fromDomain(timing) {
    let start = moment({ hour: timing.beginHour, minute: timing.beginMinute });
    let end = moment({ hour: timing.endHour, minute: timing.endMinute });

    if (start.unix() >= end.unix()) {
        return Promise.reject("Время начала должно быть меньше времени конца");
    }

    return Promise.resolve({
        start: start.toDate(),
        duration: end.diff(start, 'minutes')
    }); 
}

module.exports.create = (options) => fromDomain(options).then(helper.create);
module.exports.browse = () => helper.browse().then((timings) => timings.map(toDomain));
module.exports.get = (options) => helper.get(options).then(toDomain);
module.exports.delete = helper.delete;