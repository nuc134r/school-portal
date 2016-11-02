'use strict';

const STUDENT_THEME = { primary: 'teal', secondary: 'blue' };
const TEACHER_THEME = { primary: 'purple', secondary: 'indigo' };
const ADMIN_THEME   = { primary: 'deep-orange', secondary: 'blue' };

function create(layout_mode) {
    
    var helper = {};

    helper.render = function (req, res, params, options) {

        let mandatory_params = {
            title: options.title,
            user: req.school_context.user,
            layout: layout_mode,
            query_params: req.query
        };

        if (req.query['ajax']) {
            let parts = options.view.split('/');
            let view_name = '_' + parts[parts.length - 1];
            parts[parts.length - 1] = view_name;
            options.view = parts.join('/');
        }

        switch (layout_mode) {
            case 'teacher':
                mandatory_params.theme = TEACHER_THEME;
                break;
            case 'student':
                mandatory_params.theme = STUDENT_THEME;
                break;
            case 'admin':
                mandatory_params.theme = ADMIN_THEME;
                break;
        }

        res.render(options.view, Object.assign(mandatory_params, params));
        res.end();
    }

    return helper;
}

module.exports = create;