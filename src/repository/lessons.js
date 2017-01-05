'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'lesson');

const time = require('./time');

module.exports.create = helper.create;
module.exports.browse = helper.browse;
module.exports.get = helper.get;
module.exports.delete = helper.delete;

module.exports.saveTimetable = (timetable, group, weekType) => {
    return helper.delete({ "groupId": group, "weektype": weekType })
        .then(() => {

            timetable.forEach(entry => {
                entry.groupId = group;
                entry.weektype = weekType;
            });

            connection.models['lesson'].bulkCreate(timetable);
        });
}

module.exports.getTimetable = (group, weekType) => {
    return connection.models['lesson'].findAll({
        where: {
            "groupId": group,
            "weektype": weekType
        }
    });
}

module.exports.getLessonsFor = (group, days) => {
    let filter = [];

    days.forEach((day) => {
        filter.push({
            $and: {
                "weektype": day.week.type,
                "weekday": day.weekday.code
            }
        })
    })

    return connection.models['lesson'].findAll({
        where: {
            "groupId": group,
            $or: filter
        },
        include: [
            connection.models['subject'],
            {
                model: connection.models['teacher'],
                include: [
                    connection.models['user']
                ]
            },
            connection.models['timing'],
            connection.models['auditory']
        ]
    })
}

module.exports.getWeekLessons = (group, weekType) => {
    if (!weekType) weekType = time.getWeekInfo().type;

    return connection.models['lesson'].findAll({
        where: {
            "groupId": group,
            "weektype": weekType
        },
        include: [
            connection.models['subject'],
            {
                model: connection.models['teacher'],
                include: [
                    connection.models['user']
                ]
            },
            connection.models['timing'],
            connection.models['auditory']
        ]
    })
}

module.exports.getDayInfoLessons = (group) => {
    return connection.models['lesson'].findAll({
        where: {
            "groupId": group,
            "weektype": time.getWeekInfo().type,
            "weekday": time.getDayInfo().code
        },
        include: [
            connection.models['subject'],
            {
                model: connection.models['teacher'],
                include: [
                    connection.models['user']
                ]
            },
            connection.models['timing'],
            connection.models['auditory']
        ]
    })
}