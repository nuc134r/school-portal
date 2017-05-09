'use strict';

const moment = require('moment');

const database = require('../database/database');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'message');

module.exports.send = (fromId, toId, text) => {
    return helper.create({ fromId, toId, text }).then(message => {
        message.createdAtDisplay = moment(message.createdAt).format('LLL');
        return message;
    });
}

module.exports.getHistory = (fromId, toId) => {
    return connection
        .models['message']
        .findAll({
            where: {
                fromId: {
                    $or: [
                        fromId,
                        toId
                    ]
                },
                toId: {
                    $or: [
                        fromId,
                        toId
                    ]
                }
            }
        }).then(messages => {
            return messages.map(message => {
                message.createdAtDisplay = moment(message.createdAt).format('LLL');
                return message;
            });
        });
}