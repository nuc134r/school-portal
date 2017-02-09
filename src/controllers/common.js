'use strict';

module.exports.getSettingsPage = (req, res) => {
    const helper = require('./controller-helper')(req.school_context.user.type);

    let settings = "";

    let renderOptions = {
        view: 'common/settings',
        title: 'Настройки',
    };

    helper.render(req, res, { settings }, renderOptions);
}