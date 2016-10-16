'use strict';

const config = require('../../config.json');
const moment = require('moment');

let sessions = {};

function generate_token(user) {
    let random = "" + Math.floor(Math.random() * 1000000);

    let payload = {
        ts: moment().toISOString(),
        u: user.id
    }

    return new Buffer(random +  JSON.stringify(payload)).toString('base64');
}

function create(user) {
    let token = generate_token(user);

    let session_expires = moment().add(config.session_timeout_in_hours, 'hours').unix();

    sessions[token] = user;
    sessions[token].expires = session_expires;

    return token;
}

function get(token) {
    let session = sessions[token];
    if (!session) return null;

    let has_expired = moment().unix() > session.expires

    return has_expired ? null : session;
}

function remove(token) {
    sessions[token] = null;
}

function load(saved_sessions) {

}

function getAll() {
    let sessions_arr = [];

    for (let token in sessions) {
        sessions_arr.push({
            token,
            data: sessions[token]
        });
    }

    return sessions_arr;
}

module.exports.create = create;
module.exports.get = get;
module.exports.load = load;
module.exports.remove = remove;
module.exports.getAll = getAll;