'use strict';

var express = require('express');
var controller = require('./user.controller');
var thingController = require('../thing/thing.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id/things', auth.isAuthenticated(), thingController.indexForUser);
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/standard', auth.isAuthenticated(), controller.standard);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/contacts', auth.isAuthenticated(), controller.addContact);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
