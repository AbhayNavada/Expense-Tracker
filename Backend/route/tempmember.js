// jshint esversion : 6

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var Member = require('../model/member'); 
var TempMember = require('../model/tempmember');
var Group = require('../model/group');
var router = express.Router();

// Create Temp Member
router.post('/tempcreatemember',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var tempmember = new TempMember({
			_id: new mongoose.Types.ObjectId(),
			_Uid: req.body._Uid,
			_groupId: req.body._groupId,
			groupName: req.body.groupName
		});
		TempMember.add(tempmember, (err, model) => {
			if(err) {
				res.status(501).json(err);
				console.log(err);
			}else {
				res.status(200).json({message: 'Temp Member Created'});
			}
		});
	}
);

// Read all Temp Members
router.post('/getalltempmember',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		TempMember.getAll(req.body._id, (terr, tmodel) => {
			if(terr) {
				res.status(501).json(terr);
			}else {
				var obj = [];
				for (let i of tmodel) {
					Member.getById(i._Uid, (err, model) => {
						if(err) res.status(501).json(err);
						else {
							Group.getById(i._groupId, (err, gmodel) => {
								if(err) res.status(501).json(err);
								else {
									obj.push({_id: i._id, _Uid: i._Uid, email: gmodel.email, groupName: i.groupName, _groupId: i._groupId});
									if(obj.length == tmodel.length) res.status(200).json(obj);
								} 
							});
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