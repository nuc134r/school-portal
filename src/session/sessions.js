'use strict';

const config = require('../../config.json');
const moment = require('moment');

let sessions = {};

function create(user) {
    let session_expires = moment().add(config.session_timeout_in_hours, 'hours');

    let token_data = JSON.stringify({ utc: moment().toISOString(), user: user.id, payload: "Vlad is glad" });
    let token = new Buffer(token_data).toString('base64');

    sessions[token] = user;
    sessions[token].expires = session_expires.toObject();

    return token;
}

function get(token) {
    let session = sessions[token];
    let expires = moment(session.expires);

    let has_expired = moment().unix() > expires.unix();

    return has_expired ? null : session;
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
module.exports.getAll = getAll;