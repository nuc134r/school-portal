'use strict';

const UUID = require('node-uuid');
const database = require('../database/database');
const connection = database.getConnection();

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
    cache[token] = null;
    connection.models.session.destroy({ where: { token } }).then();
}

module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;