var sessions = {};

function push(token, session) {
    sessions[token] = session;
}

function get(token) {
    return sessions[token];
}

function load(saved_sessions) {

}

function getAll() {
    var sessions_arr = [];

    for (var token in sessions) {
        sessions_arr.push({
            token,
            data: sessions[token]
        });
    }

    return sessions_arr;
}

module.exports.push = push;
module.exports.get = get;
module.exports.load = load;
module.exports.getAll = getAll;