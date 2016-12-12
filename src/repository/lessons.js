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

module.exports.getTodayLessons = (group) => {
    return connection.models['lesson'].findAll({
        where: {
            "groupId": group,
            "weektype": time.getCurrentWeektype(),
            "weekday": time.getCurrentWeekdayCode()
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