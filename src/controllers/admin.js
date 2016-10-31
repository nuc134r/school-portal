'use strict';

const UsersRepository = require('../repository/users');

const helper = require('./controller-helper')('admin');

function getUsersPage(req, res) {

    let message = req.query.message;

    UsersRepository.getUserList()
        .then(users => helper.render(req, res, { users, message }, {
            view: 'admin/users',
            title: 'Пользователи'
        }))
        .catch(err => console.error(err));
}

function getCreateUserPage(req, res) {

    helper.render(req, res, {}, {
            view: 'admin/users_create',
            title: 'Новый пользователь'
        });
}

function createUser(req, res) {
    
    var options = req.body;
    // TODO Validate

    UsersRepository.createUser(options)
        .then(() => res.redirect('/a/users?message=success'))
        .catch(err => console.error(err));
}

module.exports.getUsersPage = getUsersPage;
module.exports.getCreateUserPage = getCreateUserPage;
module.exports.createUser = createUser;