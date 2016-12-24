'use strict';

const helper = require('./route-helper');

const adminController = require('../controllers/admin');
const studentController = require('../controllers/student');
const teacherController = require('../controllers/teacher');

const express = require('express');
const router = express.Router();

helper.init(router);

helper.whitelist('/t/*', (req) => req.school_context.user.type, 'teacher');
helper.whitelist('/a/*', (req) => req.school_context.user.type, 'admin');
helper.whitelist('/s/*', (req) => req.school_context.user.type, 'student');

/* admin */
router.get('/a', (req, res) => res.redirect('/a/users'));

helper.createContollerRoutes('a', router, adminController.UsersContoller);
helper.createContollerRoutes('a', router, adminController.SpecialtiesContoller);
helper.createContollerRoutes('a', router, adminController.GroupsContoller);
helper.createContollerRoutes('a', router, adminController.SubjectsContoller);
helper.createContollerRoutes('a', router, adminController.AuditoriesContoller);
helper.createContollerRoutes('a', router, adminController.TimingsContoller);

/* teacher */
router.get('/t', (req, res) => res.redirect('/t/timetable'));

router.get('/t/timetable', teacherController.getLessonsEditorPage);
router.get('/t/timetable_editor', teacherController.getLessonsEditor);
router.post('/t/timetable', teacherController.saveLessons);

/* student */
router.get('/s', (req, res) => res.redirect('/s/dashboard'));

router.get('/s/dashboard', studentController.getDashboardPage);
router.get('/s/timetable', studentController.getTimetablePage);

module.exports = router;