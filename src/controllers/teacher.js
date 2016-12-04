'use strict';

const url = require('url');

const LessonsRepository = require('../repository/lessons');

const helper = require('./controller-helper')('teacher', 't');
//const config = require('../../config.json');

module.exports.getLessonsEditorPage = (req, res) => {

    let renderOptions = {
        view: 'teacher/lessons_editor',
        title: 'Изменение расписания'
    };

    helper.render(req, res, {}, renderOptions);
}