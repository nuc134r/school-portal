'use strict';

const db = require('../database/postgre-pool');
const UUID = require('node-uuid');
const database = require('../database/database');
const connection = database.getConnection();

const config = require('../../config.json');

function create(user) {
    let token = UUID().replace(/-/g, '');

    return connection.models.session.create({
        token,
        userId: user.id
    }).then(session => session.token);
}

function get(token) {

    return connection.models.session.find({
        include: [{
            model: connection.models.user
        }],
        where: {
            token,
            createdAt: {
                $gt: new Date(new Date() - config.session_timeout_in_hours * 60 * 60 * 1000)
            }
        }
    }).then(session => session.user.asViewModel());


    /*let sql = `SELECT *
               FROM users
               WHERE
                   id = (SELECT "userId" 
                         FROM sessions 
                         WHERE 
                             token = '${token}' 
                             AND 
                             "createdAt" > (CURRENT_TIMESTAMP - INTERVAL '7 days'))`;

    return db.execute(sql).then(user => {
        if (user[0]) {
            user = user[0];
            return user; 
        }
        return null;
    });*/
}

function remove(token) {
    //sessions[token] = null;
}

module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;