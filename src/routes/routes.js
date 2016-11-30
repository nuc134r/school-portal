'use strict';

const helper = require('./route-helper');

const adminController = require('../controllers/admin');
const studentController = require('../controllers/student');

const express = require('express');
const router = express.Router();

helper.init(router);

/* admin */
router.get('/a', (req, res) => res.redirect('/a/users'));

helper.createCrudRoutes('a', router, adminController.UsersCrud);
helper.createCrudRoutes('a', router, adminController.SpecialtiesCrud);
helper.createCrudRoutes('a', router, adminController.GroupsCrud);
helper.createCrudRoutes('a', router, adminController.SubjectsCrud);
helper.createCrudRoutes('a', router, adminController.AuditoriesCrud);

/* student */
router.get('/s', (req, res) => res.redirect('/s/dashboard'));

router.get('/s/dashboard', studentController.getDashboardPage);

module.exports = router;