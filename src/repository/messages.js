'use strict';

const moment = require('moment');

const database = require('../database/database');
const rawQueries = require('../database/raw-queries');
const connection = database.getConnection();

const helper = require('./repository-helper')(connection, 'message');

module.exports.send = (fromId, toId, text) => {
    return helper.create({ fromId, toId, text }).then(message => {
        message.createdAtDisplay = moment(message.createdAt).format('LLL');
        return message;
    });
}

module.exports.getChats = (userId) => {

    return connection.query(rawQueries.getAllChats, {
        replacements: { userId },
        type: connection.QueryTypes.SELECT
    })
        .then((chats) => {

            for (let i = 0; i < chats.length; i++) {
                let chat = chats[i];
                chat.user = connection.models["user"].build(chat);
                chat.createdAtDisplay = moment(chat.messageCreatedAt).format('LLL');
            }

            return chats;
        });
}

module.exports.getHistory = (fromId, toId) => {
    return connection
        .models['message']
        .findAll({
            where: {
                $or: [
                    {
                        fromId: fromId,
                        toId: toId
                    },
                    {
                        fromId: toId,
                        toId: fromId
                    }
                ]
            }
        }).then(messages => {
            return messages.map(message => {
                message.createdAtDisplay = moment(message.createdAt).format('LLL');
                return message;
            });
        });
}