'use strict';

const db = require('../database/postgre-pool');

function CreateRepository() {
    this.getUserList = () => {
        return db.execute('SELECT firstname, middlename, lastname, type FROM _user;')
    }

}

module.exports = CreateRepository;