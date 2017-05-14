'use strict';

const helper = require('./route-helper');

const adminController = require('../controllers/admin');
const studentController = require('../controllers/student');
const teacherController = require('../controllers/teacher');
const commonController = require('../controllers/common');

const express = require('express');
const router = express.Router();

helper.init(router);

helper.whitelist('/t/*', (req) => req.school_context.user.type, 'teacher');
helper.whitelist('/a/*', (req) => req.school_context.user.type, 'admin');
helper.whitelist('/s/*', (req) => req.school_context.user.type, 'student');
helper.blacklist('/settings', (req) => req.school_context.user.type, 'admin');
helper.blacklist('/profile/*', (req) => req.school_context.user.type, 'admin');
helper.blacklist('/chat*', (req) => req.school_context.user.type, 'admin');

/* admin */
router.get('/a', (req, res) => res.redirect('/a/users'));
helper.createContollerRoutes('a', router, adminController.UsersContoller);
helper.createContollerRoutes('a', router, adminController.SpecialtiesContoller);
helper.createContollerRoutes('a', router, adminController.GroupsContoller);
helper.createContollerRoutes('a', router, adminController.SubjectsContoller);
helper.createContollerRoutes('a', router, adminController.AuditoriesContoller);
helper.createContollerRoutes('a', router, adminController.TimingsContoller);

/* teacher */
router.get('/t', (req, res) => res.redirect('/t/dashboard'));
router.get('/t/dashboard', teacherController.getDashboardPage);
router.get('/t/timetable', teacherController.getLessonsEditorPage);
router.get('/t/timetable_editor', teacherController.getLessonsEditor);
router.post('/t/timetable', teacherController.saveLessons);
helper.createContollerRoutes('t', router, teacherController.NewsController);
helper.createContollerRoutes('t', router, teacherController.TasksController);
router.get('/t/tasks/review', commonController.getTaskListPage);
router.get('/t/tasks/review/:id', commonController.getTaskPage);
router.get('/t/tasks/result/:id', commonController.getTaskResultPage);
router.post('/t/tasks/result/:id', teacherController.saveTaskResult);

/* student */
router.get('/s', (req, res) => res.redirect('/s/dashboard'));
router.get('/s/dashboard', studentController.getDashboardPage);
router.get('/s/timetable', studentController.getTimetablePage);
router.get('/s/tasks', commonController.getTaskListPage);
router.get('/s/tasks/:id', commonController.getTaskPage);
router.post('/s/tasks/:id', studentController.saveTaskSolution);

/* common */
router.get('/settings', commonController.getSettingsPage);
router.post('/saveProfileImage', commonController.saveProfileImage);
router.post('/savePassword', commonController.savePassword);
router.get('/profile/:user_id', commonController.getProfilePage);
router.get('/groups', commonController.getAllGroupsPage);
router.get('/group/:group_id', commonController.getGroupPage);

router.get('/chats', commonController.getChatListPage);
router.get('/chat/:user_id', commonController.getChatPage);

router.get('/images/small/:image_id', commonController.getSmallProfileImage);
router.get('/images/large/:image_id', commonController.getLargeProfileImage);

module.exports = router;