// jshint esversion : 6

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var Member = require('../model/member'); 
var TempGroup = require('../model/tempgroup');
var router = express.Router();

// Create Temp Group
router.post('/tempcreategroup',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var tempgroup = new TempGroup({
			_id: new mongoose.Types.ObjectId(),
			_Uid: req.body._id,
			groupName: req.body.groupName
		});
		TempGroup.add(tempgroup, (err, model) => {
			if(err) {
				res.status(501).json(err);
				console.log(err);
			}else {
				res.status(200).json({message: 'Temp Group Created'});
			}
		});
	}
);

// Read all Temp Groups
router.get('/getalltempgroup',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		TempGroup.getAll((terr, tmodel) => {
			if(terr) {
				res.status(501).json(terr);
			}else {
				var obj = [];
				for (let i of tmodel) {
					Member.getById(i._Uid, (err, model) => {
						if(err) res.status(501).json(err);
						else {
							obj.push({_id: i._id, _Uid: i._Uid, email: model.email, groupName: i.groupName});
							if(obj.length == tmodel.length) res.status(200).json(obj);
						}
					});
				}
				if(!tmodel.length) {
					res.status(200).json(obj);
				}
			}
		});
	}
);

module.exports = router;