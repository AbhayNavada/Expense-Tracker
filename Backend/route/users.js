// jshint esversion : 6

var express = require('express');
var router = express.Router();

var member = require('./member');
var group = require('./group');
var tempgroup = require('./tempgroup');
var tempmember = require('./tempmember');
var transaction = require('./transaction');
var report = require('./report');

// Member route
router.use('', member);

// Group route
router.use('', group);

// Temp Group route
router.use('', tempgroup);

// Temp Member route
router.use('', tempmember);

// Transaction route
router.use('', transaction);

// Report route
router.use('', report);

module.exports = router;