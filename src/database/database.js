'use strict';

const config = require('../../config');
const Sequelize = require('sequelize');

const UserModel = require('./models/user');
const SessionModel = require('./models/session');
const SpecialtyModel = require('./models/specialty');
const CourseModel = require('./models/course');
const GroupModel = require('./models/group');

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
        },
        logging: false
    });

function getConnection() {
    return sequelize;
}

function Init() {
    UserModel.Init(sequelize);
    SessionModel.Init(sequelize);
    CourseModel.Init(sequelize);
    SpecialtyModel.Init(sequelize);
    GroupModel.Init(sequelize);

    sequelize.sync().then(() => {
        console.log('Database initialized');
        CreateRootAdmin()
            .then((instance, created) => created && console.log('Root admin created'))
            .catch(err => console.error(err));
    });
}

function CreateRootAdmin() {
    return sequelize.models.user.findOrCreate({
        where: {
            login: 'admin',
            password: config.default_admin_password,
            firstname: 'root',
            lastname: 'admin',
            middlename: '',
            type: 'admin'
        }
    })
}

module.exports.getConnection = getConnection;
module.exports.Init = Init;