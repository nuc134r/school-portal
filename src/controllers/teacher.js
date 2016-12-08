'use strict';

const url = require('url');

const LessonsRepository = require('../repository/lessons');
const GroupsRepository = require('../repository/groups');
const SubjectsRepository = require('../repository/subjects');
const AuditoriesRepository = require('../repository/auditories');
const TimingsRepository = require('../repository/timings');
const TeachersRepository = require('../repository/teachers');

const helper = require('./controller-helper')('teacher', 't');
//const config = require('../../config.json');

module.exports.getLessonsEditorPage = (req, res) => {

    let lists = {
        lessons: LessonsRepository.browse,
        groups: GroupsRepository.browse,
        subjects: SubjectsRepository.browse,
        auditories: AuditoriesRepository.browse,
        timings: TimingsRepository.browse,
        teachers: TeachersRepository.browse
    }

    let processors = {
        teachers: (teacher) => { return { text: `${teacher.user.lastname} ${teacher.user.firstname.charAt(0)}. ${teacher.user.middlename.charAt(0)}.`, value: teacher.id } },
        subjects: (_) => { return { text: _.name, value: _.id } },
        auditories: (_) => { return { text: _.name, value: _.id } },
        groups: (_) => { return { text: _.name, value: _.id } }
    }

    helper.processPromises(lists, processors)
        .then((lists) => {
            let renderOptions = {
                view: 'teacher/lessons',
                title: 'Изменение расписания'
            };

            helper.render(req, res, { lists }, renderOptions);
        })
        .catch(err => {
            console.error(err);
            res.end(err);
        })
}

module.exports.saveLessons = (req, res) => {
    let a = 5;
}