'use strict';

var pg = require('pg');
var fs = require('fs');
var path = require('path');
var config = require('../../config').database;
var async = require('async');

let pool = new pg.Pool(config);

async.waterfall([
    (callback) => {
        console.time('creation time');
        fs.readdir(path.join(__dirname, 'creation'), callback);
    },
    (files, callback) => {
        var scripts = files.map((filename) => {
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
                script.data = data.toString();
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
    });


/*
pool.connect((err, client, done) => {
    if (err) {
        return console.error('error fetching client from pool', err);
    }




    let schemaScript = fs.readFileSync(path.join(__dirname, 'creation')).toString();

    client.query(
        schemaScript,
        //`insert into subject (name) values ('Технология разработки программных продуктов'); select * from subject`,
        function (err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].number);
            //output: 1
        });
});

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
})
*/