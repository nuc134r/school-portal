'use strict';

let pg = require('pg');
let fs = require('fs');
let path = require('path');
let async = require('async');

// TODO object assign
let db_config = require('../../config').db;
let db_user = require('../../config').db_user;
let db_superuser = require('../../config').db_superuser;

let superuser_config = Object.assign(db_superuser, db_config);

let pool = new pg.Pool(superuser_config);

async.waterfall([
    (callback) => {
        console.time('creation time');
        fs.readdir(path.join(__dirname, 'creation'), callback);
    },
    (files, callback) => {
        let scripts = files.map((filename) => {
            return {
                filename: filename,
                path: path.join(__dirname, 'creation', filename),
                data: null
            }
        });

        async.filter(scripts, (script, callback) => {
            fs.stat(script.path, (err, stats) => {
                callback(err, stats.isFile());
            });
        }, callback);
    },
    (scripts, callback) => {
        async.eachOfSeries(scripts, (script, key, callback) => {
            fs.readFile(script.path, "utf8", (err, data) => {
                let scriptCode = data.toString();
                
                scriptCode = scriptCode.replace(/\$\{superuser\}/g, db_user.user);
                scriptCode = scriptCode.replace(/\$\{user\}/g, db_superuser.user);

                script.data = scriptCode;
                callback(err);
            });
        }, (err) => {
            callback(err, scripts);
        });
    },
    (scripts, callback) => {
        pool.connect((err, client, done) => {
            if (err) {
                console.log('error fetching client from pool');
            }

            callback(err, scripts, client, done);
        });
    },
    (scripts, client, releaseClient, callback) => {
        async.eachOfSeries(scripts, (script, key, callback) => {
            client.query(script.data, (err, result) => {
                if (err) {
                    console.log(`${script.filename} failed`);
                } else {
                    console.log(`${script.filename} executed`);
                }
                callback(err);
            });
        }, (err) => {
            releaseClient();
            callback(err);
        })
    }
],
    (err, result) => {
        console.timeEnd('creation time');

        if (err) {
            return console.error("Error during database creation", err);
        }

        console.log('Database created!');
    }
);