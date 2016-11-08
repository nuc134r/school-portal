'use strict';

const helper = require('./route-helper');

const adminController = require('../controllers/admin');

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

/*  */

module.exports = router;