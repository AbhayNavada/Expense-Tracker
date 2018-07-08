// jshint esversion : 6

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var Transaction = require('../model/transaction');
var router = express.Router();

router.post('/groupexpense',	
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Transaction.getExpenseReportByMonth(req.body.groupId, req.body.year, 1, (err, model) => {
			if(err) res.status(501).json(err);
			else res.status(200).json(model);
		});				
	}
);

module.exports = router;