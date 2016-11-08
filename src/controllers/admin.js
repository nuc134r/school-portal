'use strict';

const url = require('url');

const UsersRepository = require('../repository/users');
const SpecialtiesRepository = require('../repository/specialties');

const helper = require('./controller-helper')('admin');
const config = require('../../config.json');

function GenerateListPage(req, res, getListPromise, renderOptions) {

    let message = req.query.message;

    getListPromise()
        .then((list_page_items) => helper.render(req, res, { list_page_items, message }, renderOptions))
        .catch(err => {
            res.end(err);
            console.error(err);
        });
}

module.exports.getUsersPage = getUsersPage;
module.exports.getCreateUserPage = getCreateUserPage;
module.exports.createUser = createUser;

module.exports.getSpecialtiesPage = getSpecialtiesPage;
module.exports.getCreateSpecialtyPage = getCreateSpecialtyPage;
module.exports.createSpecialty = createSpecialty;


/* Lists */

function getUsersPage(req, res) {
    let renderOptions = {
        view: 'admin/users',
        title: 'Пользователи',
        fab: {
            icon: 'add',
            link: '/a/users/create'
        }
    };
    GenerateListPage(req, res, UsersRepository.getUserList, renderOptions);
}

function getSpecialtiesPage(req, res) {
    let renderOptions = {
        view: 'admin/specialties',
        title: 'Специальности',
        fab: {
            icon: 'add',
            link: '/a/specialties/create'
        }
    };
    GenerateListPage(req, res, SpecialtiesRepository.getSpecialtyList, renderOptions);    
}

/* Edit pages */

function getCreateUserPage(req, res) {
    helper.render(req, res, {}, {
        view: 'admin/users_create',
        title: 'Новый пользователь'
    });
}

function getCreateSpecialtyPage(req, res) {
    helper.render(req, res, {}, {
        view: 'admin/specialties_create',
        title: 'Новая специальность'
    });
}

/* Post requests */

function createSpecialty(req, res) {
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