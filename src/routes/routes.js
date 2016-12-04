'use strict';

const helper = require('./route-helper');

const adminController = require('../controllers/admin');
const studentController = require('../controllers/student');

const express = require('express');
const router = express.Router();

helper.init(router);

/* admin */
router.get('/a', (req, res) => res.redirect('/a/users'));

helper.createContollerRoutes('a', router, adminController.UsersContoller);
helper.createContollerRoutes('a', router, adminController.SpecialtiesContoller);
helper.createContollerRoutes('a', router, adminController.GroupsContoller);
helper.createContollerRoutes('a', router, adminController.SubjectsContoller);
helper.createContollerRoutes('a', router, adminController.AuditoriesContoller);
helper.createContollerRoutes('a', router, adminController.TimingsContoller);

/* student */
router.get('/s', (req, res) => res.redirect('/s/dashboard'));

router.get('/s/dashboard', studentController.getDashboardPage);

module.exports = router;