'use strict';

function render(req, res, view, title, params) {
    let mandatory_params = { title, user: req.school_context.user };

    res.render(view, Object.assign(mandatory_params, params));
    res.end();
}

module.exports.render = render;