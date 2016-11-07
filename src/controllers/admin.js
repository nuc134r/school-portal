'use strict';

const url = require('url');

const UsersRepository = require('../repository/users');

const helper = require('./controller-helper')('admin');
const config = require('../../config.json');

function getUsersPage(req, res) {

    let message = req.query.message;

    UsersRepository.getUserList()
        .then((users) =>
            helper.render(req, res, { users, message }, {
                view: 'admin/users',
                title: 'Пользователи',
                fab: {
                    icon: 'add',
                    link: '/a/users/create'
                }
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

    if (options.user_type && options.user_type != 'admin') {
        options.password = config.default_user_password;
    }

    UsersRepository.createUser(options)
        .then(() => res.redirect('/a/users?message=created'))
        .catch(err => {

            if (~err.message.indexOf('#MANDATORYFIELD')) {
                options.error = 'Обязательные поля не заполнены:';
                err.errors.forEach((error) => {
                    options.error += `\n${error.path}`;
                });
            } else {
                console.error(err);
                options.error = err.message;
            }

            var redirect_url = url.format({
                query: options,
                pathname: '/a/users/create'
            });

            res.redirect(redirect_url);
        });
}

module.exports.getUsersPage = getUsersPage;
module.exports.getCreateUserPage = getCreateUserPage;
module.exports.createUser = createUser;