'use strict';

const config = require('../../config.json');
const db = require('../database/postgre-pool');
const moment = require('moment');
const UUID = require('node-uuid');

function create(user) {
    let token = UUID().replace(/-/g, '');

    let sql = `INSERT INTO session_(token, user_id) 
               VALUES ('${token}', ${user.id});`;

    return db.execute(sql).then(() => token);
}

function get(token) {
    let sql = `SELECT *
               FROM user_
               WHERE
                   id = (SELECT user_id 
                         FROM session_ 
                         WHERE 
                             token = '${token}' 
                             AND 
                             started > (CURRENT_TIMESTAMP - INTERVAL '7 days'))`;

    return db.execute(sql).then(user => {
        if (user[0]) {
            user = user[0];
            user.type = { 'a': 'admin', 't': 'teacher', 's': 'student' }[user.type];
            return user; 
        }
        return null;
    });
}

function remove(token) {
    //sessions[token] = null;
}

module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;