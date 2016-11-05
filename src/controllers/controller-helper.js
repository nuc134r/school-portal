'use strict';

const jade = require('jade');
const path = require('path');

const STUDENT_THEME = { primary: 'teal', secondary: 'blue' };
const TEACHER_THEME = { primary: 'purple', secondary: 'indigo' };
const ADMIN_THEME = { primary: 'deep-orange', secondary: 'blue' };

function getHeadlessViewName(view_path) {
    let parts = view_path.split('/');
    let view_name = '_' + parts[parts.length - 1];
    parts[parts.length - 1] = view_name;
    return parts.join('/');
}

function getTheme(layout_mode) {
    switch (layout_mode) {
        case 'teacher':
            return TEACHER_THEME;
        case 'student':
            return STUDENT_THEME;
        case 'admin':
            return ADMIN_THEME;
    }
}

function create(layout_mode) {

    var helper = {};

    helper.render = function (req, res, custom_params, options) {

        let mandatory_params = {
            title: options.title,
            layout: layout_mode,
            theme: getTheme(layout_mode),
            user: req.school_context.user,
            query_params: req.query,
            fab: options.fab
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

    return helper;
}


module.exports = create;