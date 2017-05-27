'use strict';

const config = require('../../config');
const Sequelize = require('sequelize');

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

let User = require('./models/user').Init(sequelize);
require('./models/session').Init(sequelize);
require('./models/specialty').Init(sequelize);
require('./models/course').Init(sequelize);
let Student = require('./models/student').Init(sequelize);
require('./models/group').Init(sequelize);

Student.belongsTo(sequelize.models.group, {
    foreignKey: { allowNull: false },
    onDelete: 'RESTRICT'
});

require('./models/subject').Init(sequelize);
require('./models/teacher').Init(sequelize);
require('./models/auditory').Init(sequelize);
require('./models/timing').Init(sequelize);
require('./models/lesson').Init(sequelize);
require('./models/new').Init(sequelize);
require('./models/task-comment').Init(sequelize);
require('./models/task-result').Init(sequelize);
require('./models/task').Init(sequelize);
require('./models/message').Init(sequelize);
require('./models/test-result').Init(sequelize);
require('./models/test').Init(sequelize);

User.hasMany(sequelize.models['test_result']);

function getConnection() {
    return sequelize;
}

function Init() {
    return sequelize.sync().then(() => {
        console.log('Database initialized');
        CreateRootAdmin()
            .then((instance, created) => created && console.log('Root admin created'))
            .catch(err => {
                //Swallowing errors if admin already exists
                //console.error(err)
            });
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