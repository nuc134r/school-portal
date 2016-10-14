'use strict';

const STUDENT_THEME = { primary: 'teal', secondary: 'blue'};
const TEACHER_THEME = { primary: 'purple', secondary: 'indigo'};

function render(req, res, params, options) {

    let mandatory_params = {
        title: options.title,
        user: req.school_context.user,
        theme: STUDENT_THEME
    };

    if (options.theme == 'teacher') {
        mandatory_params.theme = TEACHER_THEME;
    }

    res.render(options.view, Object.assign(mandatory_params, params));
    res.end();
}

module.exports.render = render;