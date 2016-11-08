'use strict';

const helper = require('./route-helper');

const adminController = require('../controllers/admin');
const studentController = require('../controllers/student');

const express = require('express');
const router = express.Router();

helper.init(router);

/* admin */
router.get('/a', (req, res) => res.redirect('/a/users'));

router.get('/a/users', adminController.getUsersPage);
router.get('/a/users/create', adminController.getCreateUserPage);
router.post('/a/users/create', adminController.createUser);

router.get('/a/specialties', adminController.getSpecialtiesPage);
router.get('/a/specialties/create', adminController.getCreateSpecialtyPage);
router.post('/a/specialties/create', adminController.createSpecialty);

/* student */
router.get('/s', (req, res) => res.redirect('/s/dashboard'));

router.get('/s/dashboard', studentController.getDashboardPage);

module.exports = router;