'use strict';

let config = require('../../config');

let pg = require('pg');
let pool = new pg.Pool(Object.assign(config.db_user, config.db));

let async = require('async');

function execute(script, callback) {

    async.waterfall([
        (callback) => {
            pool.connect((err, client, done) => {
                if (err) {
                    console.log('error fetching client from pool');
                }

                callback(err, client, done);
            });
        },
        (client, done, callback) => {
            client.query(script, (err, result) => {
                callback(err, result);
                done();
            });
        }
    ],
        (err, result) => {
            callback(err, result);
        }
    );
}

module.exports.execute = execute;