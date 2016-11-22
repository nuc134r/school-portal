'use strict';

const jade = require('jade');
const path = require('path');
const url = require('url');

const utils = require('../utils');

const STUDENT_THEME = { primary: 'teal', secondary: 'blue' };
const TEACHER_THEME = { primary: 'purple', secondary: 'indigo' };
const ADMIN_THEME = { primary: 'deep-orange', secondary: 'blue' };

function getHeadlessViewName(view_path) {
    let parts = view_path.split('/');
    let view_name = '_' + parts[parts.length - 1];
    parts[parts.length - 1] = view_name;
    return parts.join('/');
}

function getTheme(user_mode) {
    switch (user_mode) {
        case 'teacher':
            return TEACHER_THEME;
        case 'student':
            return STUDENT_THEME;
        case 'admin':
            return ADMIN_THEME;
    }
}

function create(user_mode, urlPrefix) {

    function render(req, res, custom_params, options) {

        let mandatory_params = {
            title: options.title,
            fab: options.fab,

            layout: user_mode,
            theme: getTheme(user_mode),

            user: req.school_context.user,

            query_params: req.query
        };

        let params = Object.assign(mandatory_params, custom_params);

        if (req.query['ajax']) {
            let view = getHeadlessViewName(options.view);

            var view_path = path.join(__dirname, '../../views', view + '.jade');

            let result = {};
            result.title = options.title;
            result.html = jade.renderFile(view_path, params);
            result.fab = options.fab;

            res.json(result);
        } else {
            res.render(options.view, params);
        }
    }

    return {
        render,
        generateCrud: function (options) {
            return {
                browse: (req, res) => {

                    let renderOptions = {
                        view: `${user_mode}/${options.entityNamePlural}`,
                        title: utils.capitalize(options.displayNamePlural),
                        fab: {
                            icon: 'add',
                            link: `/${urlPrefix}/${options.entityNamePlural}/create`
                        }
                    };

                    let message = req.query.message;

                    options.repository.browse()
                        .then((list_page_items) => render(req, res, { list_page_items, message, entity: options }, renderOptions))
                        .catch(err => {
                            res.end(err.toString());
                            console.error(err);
                        });
                },
                create: (req, res) => {

                    let requestOptions = options.onProcessForm
                        ? options.onProcessForm(req.body)
                        : req.body;

                    options.repository.create(requestOptions)
                        .then(() => res.redirect(`/${urlPrefix}/${options.entityNamePlural}?message=created`))
                        .catch(err => {

                            if (~err.message.indexOf('#MANDATORYFIELD')) {
                                requestOptions.error = 'Обязательные поля не заполнены:';
                                err.errors.forEach((error) => {
                                    requestOptions.error += `\n${error.path}`;
                                });
                            } else {
                                console.error(err);
                                requestOptions.error = err.message;
                            }

                            var redirect_url = url.format({
                                query: requestOptions,
                                pathname: `/${urlPrefix}/${options.entityNamePlural}/create`
                            });

                            res.redirect(redirect_url);
                        });
                },
                new: (req, res) => {
                    var newStatementGendered = options.displayNameIsMasculine ? 'Новый' : 'Новая';

                    render(req, res, {}, {
                        view: `${user_mode}/${options.entityNamePlural}_create`,
                        title: `${newStatementGendered} ${options.displayName}`
                    });
                },
                options
            }
        }
    };
}



module.exports = create;