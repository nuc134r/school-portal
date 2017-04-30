'use strict';

const session = require('./session/sessions');
const cookie = require('cookie');

module.exports.createHandlers = function (socket) {
    let token = cookie.parse(socket.handshake.headers.cookie).token;
    session.registerSocket(token, socket);
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