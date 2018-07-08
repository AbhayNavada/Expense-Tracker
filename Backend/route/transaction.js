// jshint esversion : 6

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var Member = require('../model/member');
var Transaction = require('../model/transaction');
var router = express.Router();

router.post('/bill',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var obj = req.body;
		obj._id = new mongoose.Types.ObjectId();
		obj.expenseDate = new Date(obj.expenseDate);
		var bill = new Transaction(obj);
		Transaction.add(bill, (err, model) => {
			if(err) res.status(501).json({message: 'Bill Uppload Unsuccessful'});
			else {
				res.status(200).json({message: 'Bill Upload Successful'});
			}
		});
	}
);

router.post('/initialtransaction',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var groupId = req.body.groupId;
		Transaction.getInitial(groupId, (err, model) => {
			if(err) res.status(501).json({message: 'Error Initial Transaction 1'});
			else res.status(200).json(model);
		});
	}
);

router.post('/approvedtransaction',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var groupId = req.body.groupId;
		Transaction.getApproved(groupId, (err, model) => {
			if(err) res.status(501).json({message: 'Error Initial Transaction'});
			else res.status(200).json(model);	
		});
	}
);

router.post('/unapprovedtransaction',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var groupId = req.body.groupId;
		Transaction.getUnapproved(groupId, (err, model) => {
			if(err) res.status(501).json({message: 'Error Initial Transaction'});
			else res.status(200).json(model);			
		});
	}
);

router.post('/completedtransaction',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var groupId = req.body.groupId;
		Transaction.getCompleted(groupId, (err, model) => {
			if(err) res.status(501).json({message: 'Error Initial Transaction'});
			else res.status(200).json(model);
		});
	}
);

router.post('/updatepoll',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		var obj = req.body;
		Transaction.updatePoll(obj, (err, model) => {
			if(err) res.status(501).json(err);
			else res.status(200).json(model);
		});
	}
);

router.post('/checkcomplete',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Transaction.getApproved(req.body.groupId, (err, model) => {
			if(err) res.status(501).json(err);
			else {
				let flag;
				if(!model.length) res.status(200).json({message: 'Empty'});
				else {
					for(let i of model) {
						flag = true;
						for(let j of i.members) {
							if(j.amount != 0) {
								flag = false;
								break;
							}
						}
						if(flag) {
							Transaction.statusCompleted(i._id, (err, model) => {
								if(err) res.status(501).json(err);
								else res.status(200).json({message: "Completed"});											
							});
						}
						res.status(200).json({message: "Not Completed"});
					}
				}
			}
		});
	}
);

router.post('/changestatus',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Transaction.getInitial(mongoose.Types.ObjectId(req.body.groupId), (err, model) =>{
			if(err) res.status(501).json(err);
			else {
				if(!model.length) res.status(200).json({message: 'Empty'});
				for(let i of model) {
					let diff = (new Date() - i.uploadDate)/1e3;
					if(diff > 84600) {
						let True = 0, False = 0;
						for(let j of i.poll) {
							if(j.response) True++;
							else False++;
						} 
						if(True >= False) {
							Transaction.statusApproved(i._id, (err, model) => {
								if(err) res.status(501).json(err);
								else res.status(200).json({message: "Approved"});			
							});
						}
						else {
							Transaction.statusUnapproved(i._id, (err, model) => {
								if(err) res.status(501).json(err);
								else res.status(200).json({message: "Unapproved"});											
							});
						}
					} else {
						res.status(200).json({message: "Initial"});
					}
				}
			}
		});
	}
);

router.post('/billpayment',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		let amt;
		let obj = {};
		obj._id = req.body._id;
		obj._Uid = req.body._Uid;
		if(req.body.checked) {
			amt = req.body.memberBalance + req.body.amount;	
			if(amt > req.body.transactionAmount) {
				obj.transactionAmount = 0;
				obj.memberBalance = amt - req.body.transactionAmount;
			} else {
				obj.transactionAmount = req.body.transactionAmount - amt;
				obj.memberBalance = 0;	
			}			
		} else {
			amt = req.body.amount;
			if(amt > req.body.transactionAmount) {
				obj.transactionAmount = 0;
				obj.memberBalance = req.body.memberBalance + (amt - req.body.transactionAmount);
			} else {
				obj.transactionAmount =  req.body.transactionAmount - amt;
				obj.memberBalance = req.body.memberBalance;			
			}
		}
		Transaction.makePayment(obj, (err, model) => {
			if(err) res.status(501).json(err);
			else {
				Member.makePayment(obj, (err, model) => {
					if(err) res.status(501).json(err);
					else res.status(200).json({message: "Payment Successful"});	
				});
			}				
		});
	}
);

module.exports = router;