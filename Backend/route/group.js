// jshint esversion : 6

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var Mail = require('../config/mail');
var Member = require('../model/member'); 
var Group = require('../model/group');
var TempGroup = require('../model/tempgroup');
var router = express.Router();

// Creating Group 
router.post('/creategroup',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		if(req.body.response) {
			var id = new mongoose.Types.ObjectId();
			var group = new Group({
			_id: id,
			_Uid: req.body._Uid,
			email: req.body.email,
			memberCount: 1,
			groupName: req.body.groupName	
			});
			Group.add(group, (err, gmodel) => {
				if(err) res.status(501).json(err);
				else {
					Member.updateById(req.body._Uid, id, (err, mmodel) => {
						if(err) res.status(501).json(err);
						else {
							TempGroup.deleteById(req.body._id, (err) => {
								if(err) res.status(501).json(err);
								else {

									const output = `
										<p>Your Group Creation request has been accepted by the admin. Group with name '${req.body.groupName}' has been successfully been created.</p>
									`;

					    			let mailOptions = {
					        		from: '"Admin" <aaroncoc0001@gmail.com>', // sender address
					        		to: req.body.email, // list of receivers
					        		subject: 'Regarding Group creation request in ExpenseTracker', // Subject line
					        		text: '', // plain text body
					        		html: output // html body
					    			};

					    			Mail.sendMail(mailOptions, (error, info) => {
					        			if (error) {
					        		    	return console.log(error);
					        			}
					        			console.log('Message sent: %s', info.messageId);
										res.status(200).json({message: 'Group Created Successfully'});
									});
								}
							});
						}
					});
				}
			});
		} else {
			TempGroup.deleteById(req.body._id, (err) => {
				if(err) res.status(501).json(err);
				else {

					const output = `
						<p>Your Group Creation request has been rejected by the admin. Group with name '${req.body.groupName}' has not been created.</p>
					`;

					let mailOptions = {
						from: '"Admin" <aaroncoc0001@gmail.com>', // sender address
						to: req.body.email, // list of receivers
						subject: 'Regarding Group creation request in ExpenseTracker', // Subject line
						text: '', // plain text body
						html: output // html body
					};
						  
					Mail.sendMail(mailOptions, (error, info) => {
						if (error) {
						    return console.log(error);
						}
						console.log('Message sent: %s', info.messageId);
						res.status(200).json({message: 'Group creation rejected'});
					});
				}
			});			
		}
	}
);

// Search Group Head
router.post('/searchgh',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Group.searchgh(req.body.email, (err, model) => {
			if(err) res.status(501).json(err);
			else res.status(200).json(model);
		});
	}
);

// Get All Group Members
router.post('/groupmembers',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Member.getGroupMembers(req.body._groupId, (err, model) => {
			if(err) res.status(501).json(err);
			else {
				res.status(200).json(model);
			}			
		});
	}	
);

// Change Group Head
router.post('/deletegh',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Group.updategh(req.body._id, req.body.email, req.body._groupId,  (err, model) => {
			if(err) res.status(501).json(err);
			else {
				res.status(200).json({message: 'Group Head Updated'});
			}
		});
	}
);

module.exports = router;