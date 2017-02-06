'use strict';

const jade = require('jade');
const path = require('path');
const url = require('url');

const async = require('async');

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
            fab: options.fab || {link: null, icon: null},
            searchable: options.searchable,

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
            result.searchable = options.searchable;

            res.json(result);
        } else {
            try {
                res.render(options.view, params);
            } catch (err) {
                console.error(err);
            }
        }
    }

    function processPromises(promiseList, processors) {
        return new Promise((resolve, reject) => {
            let resolvedLists = {};
            async.forEachOf(promiseList, function (listGetterPromise, key, callback) {
                listGetterPromise()
                    .then(data => {
                        resolvedLists[key] = data;
                        if (data.length && data[0].dataValues) {
                            resolvedLists[key] = data.map(_ => _.dataValues);
                        }
                        if (processors && processors[key]) {
                            resolvedLists[key] = resolvedLists[key].map(processors[key]);
                        }
                        callback();
                    })
                    .catch((err) => {
                        callback(err);
                    });
            }, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(resolvedLists);
                }
            })
        });
    }

    return {
        render,
        processPromises,
        generateContoller: function (options) {
            options.urlPrefix = urlPrefix;
            return {
                browse: (req, res) => {

                    let renderOptions = {
                        view: `${user_mode}/${options.entityNamePlural}`,
                        title: utils.capitalize(options.displayNamePlural),
                        searchable: true,
                        fab: {
                            icon: 'add',
                            link: `/${urlPrefix}/${options.entityNamePlural}/create`
                        }
                    };

                    let message = req.query.message;

                    options.repository.browse()
                        .then((list_page_items) => {
                            render(req, res, { list_page_items, message, entity: options }, renderOptions);
                        })
                        .catch(err => {
                            res.end(err.toString());
                            console.error(err);
                        });
                },
                createPage: (req, res) => {

                    processPromises(options.lists, options.listProcessors)
                        .then((lists) => {
                            let newStatementGendered = options.displayNameIsMasculine ? 'Новый' : 'Новая';
                            render(req, res, { lists, options }, {
                                view: `${user_mode}/${options.entityNamePlural}_create`,
                                title: `${newStatementGendered} ${options.displayName}`
                            });
                        })
                        .catch((err) => {
                            if (err) console.error(err.message);

                            res.end(err);
                        });
                },
                editPage: (req, res) => {

                    processPromises(options.lists, options.listProcessors)
                        .then((lists) => {
                            options.repository.get({ id: req.params.id })
                                .then((item) => {
                                    req.query = item;

                                    render(req, res, { lists, edit_mode: true, options }, {
                                        view: `${user_mode}/${options.entityNamePlural}_create`,
                                        title: `Изменение ${options.displayNameGenetive}`
                                    });
                                })
                        })
                        .catch((err) => {
                            res.end(err.toString());
                                console.error(err);
                        });
                },
                edit: (req, res) => {

                    let entity_id = req.params.id;

                    let requestOptions = options.onProcessForm
                        ? options.onProcessForm(req.body)
                        : req.body;

                    options.repository.update(entity_id, requestOptions)
                        .then(() => res.redirect(`/${urlPrefix}/${options.entityNamePlural}?message=edited`))
                        .catch(err => {
                            if (err.errors) {
                                err.errors.forEach((error, i) => {
                                    requestOptions[`error[${i}]`] = error.message;
                                });
                            } else {
                                requestOptions['error'] = err.message || err;
                            }

                            var redirect_url = url.format({
                                query: requestOptions,
                                pathname: `/${urlPrefix}/${options.entityNamePlural}`
                            });

                            res.redirect(redirect_url);
                        });
                },
                create: (req, res) => {

                    let requestOptions = options.onProcessForm
                        ? options.onProcessForm(req.body)
                        : req.body;

                    options.repository.create(requestOptions)
                        .then(() => res.redirect(`/${urlPrefix}/${options.entityNamePlural}?message=created`))
                        .catch(err => {
                            if (err.errors) {
                                err.errors.forEach((error, i) => {
                                    requestOptions[`error[${i}]`] = error.message;
                                });
                            } else {
                                requestOptions['error'] = err.message || err;
                            }

                            var redirect_url = url.format({
                                query: requestOptions,
                                pathname: `/${urlPrefix}/${options.entityNamePlural}/create`
                            });

                            res.redirect(redirect_url);
                        });
                },
                deletePage: (req, res) => {
                    let renderOptions = {
                        view: 'common/delete.jade',
                        title: 'Удаление ' + options.displayNameGenetive.toLowerCase()
                    };

                    options.repository.get({ id: req.params.id })
                        .then((item) => {
                            render(req, res, { item, entity: options }, renderOptions);
                        })
                        .catch(err => {
                            res.end(err.toString());
                            console.error(err);
                        });
                },
                delete: (req, res) => {
                    let id = req.params.id;

                    options.repository.delete({ id })
                        .then(() => res.end('ok'))
                        .catch(err => {
                            options.repository.get({ id })
                                .then((item) => {
                                    res.end(`Невозможно удалить ${options.displayNameAccusative} ${item.getDisplayName()}. Возможно, этот объект ещё используется в других местах.`)
                                })
                        });
                },
                options
            }
        }
    };
}



module.exports = create;