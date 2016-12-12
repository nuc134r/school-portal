'use strict';

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'lesson');

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