'use strict';

const config = require('../../config');
const Sequelize = require('sequelize');

const UserModel = require('./models/user');

const sequelize = new Sequelize(
    config.db.database,
    config.db_superuser.user,
    config.db_superuser.password,
    {
        host: config.db.host,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    });

function getConnection() {
    return sequelize;
}

function Init() {
    console.log('Initializing database');

    UserModel.Init(sequelize);


    sequelize.sync().then(() => {
        console.log('Database initialized');
    });
}

module.exports.getConnection = getConnection;
module.exports.Init = Init;