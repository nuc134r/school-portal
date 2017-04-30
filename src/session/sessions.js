'use strict';

const UUID = require('node-uuid');
const database = require('../database/database');
const connection = database.getConnection();

const useragent = require('useragent');

const config = require('../../config.json');

let cache = {};

function create(user) {
    let token = UUID().replace(/-/g, '');

    return connection.models.session.create({
        token,
        userId: user.id
    }).then(session => session.token);
}

function getExpirationBoundary() {
    return new Date(new Date() - config.session_timeout_in_hours * 60 * 60 * 1000);
}

function get(token) {

    let cached = cache[token];
    if (cached && cached.createdAt > getExpirationBoundary()) {
        return Promise.resolve(cached.user);
    }

    return connection.models.session.find({
        include: [{
            model: connection.models.user
        }],
        where: {
            token,
            createdAt: {
                $gt: getExpirationBoundary()
            }
        }
    })
        .then(session => {
            if (!session) return null;

            if (session.user.type == 'student') {
                return connection.models["student"].find({
                    where: { userId: session.user.id },
                    include: connection.models.group
                })
                    .then(student => {
                        session.user.student = {
                            group: student.group.name,
                            groupId: student.group.id
                        };

                        return session;
                    })
            } else if (session.user.type == 'teacher') {
                return connection.models["teacher"].find({
                    where: { userId: session.user.id }
                })
                    .then(teacher => {
                        session.user.teacher = teacher;

                        return session;
                    })
            } else {
                return session;
            }
        })
        .then(session => {
            if (!session) return null;

            cache[session.token] = session.dataValues;
            cache[session.token].user = session.user.asViewModel();

            return session.user.asViewModel();
        });
}

function remove(token) {
    delete cache[token];
    connection.models.session.destroy({ where: { token } }).then();
}

function invalidate(user) {
    for (let key in cache) {
        let entry = cache[key];
        if (entry.user.id == user.id) {
            delete cache[key];
        }
    }
}

function registerSocket(token, socket) {
    let session = cache[token];

    session.sockets = session.sockets || {};
    session.sockets[socket.id] = socket;

    socket.agent = useragent.parse(socket.handshake.headers['user-agent']);

    console.log(`User ${session.user.login} connected (${socket.id}) (${socket.agent.toString()})`);

    socket.on('disconnect', () => {
        session.sockets[socket.id] = undefined;

        console.log(`User ${session.user.login} disconnected (${socket.id}) (${socket.agent.toString()})`);
    })
}

module.exports.registerSocket = registerSocket;
module.exports.invalidate = invalidate;
module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;