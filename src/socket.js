'use strict';

const MessagesRepository = require("./repository/messages");
const session = require('./session/sessions');
const cookie = require('cookie');

module.exports.createHandlers = function (socket) {
    let token = cookie.parse(socket.handshake.headers.cookie).token;
    let user = session.registerSocketAndGetUserByToken(token, socket);

    user.images = user.getImageUrls();

    let message = null;

    socket.on('message', (data) => {
        MessagesRepository
            .send(user.id, data.to, data.message)
            .then(result => {
                message = { toId: data.to, from: user, message: data.message, createdAtDisplay: result.createdAtDisplay, createdAt: result.createdAt };
            })
            // sender gets his own message via socket
            .then(() => session.sendSocket(user.id, 'message', message))
            // reciever gets message
            .then(() => {
                if (user.id != data.to)
                {
                    session.sendSocket(data.to, 'message', Object.assign(message, { inbox: true }));
                }
            });
    });
}

module.exports.authorize = function (handshakeData, accept) {
    if (handshakeData.headers.cookie) {
        handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

        session.get(handshakeData.cookie['token'])
            .then(user => {
                if (user) {
                    return accept(null, true);
                } else {
                    return accept('Socket client session token invalid', false);
                }
            });

    } else {
        return accept('No cookie transmitted.', false);
    }
}