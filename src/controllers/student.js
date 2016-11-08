'use strict';

const helper = require('./controller-helper')('student');

module.exports.getDashboardPage = getDashboardPage;

function getDashboardPage(req, res) {
    let renderOptions = {
        view: 'student/dashboard',
        title: 'Сегодня',
    };
    
    helper.render(req, res, {}, renderOptions);
}