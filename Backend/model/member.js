// jshint esversion : 6

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var ModelSchema = mongoose.Schema({
	_id: mongoose.Schema.ObjectId,
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	dob: {
		type: Date,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	contactno: {
		type: Number,
		required: true
	},
	gender: {
		type: String
	},
	_groupId: [{
		type: mongoose.Schema.ObjectId,
		refs: 'group' 
	}],
	password: {
		type: String,
		required: true
	},
	securityQuestion: {
		type: String,
		required: true
	},
	securityAnswer: {
		type: String,
		required: true
	},
	balance: {
		type: Number
	}
});

var Member = mongoose.model('member', ModelSchema);

module.exports = Member;

// Create
module.exports.addUser = (model, callback) => {
	model.password = bcrypt.hashSync(model.password, 10);
	model.save(callback);
};

// Read
module.exports.getById = (id, callback) => {
	Member.findById(id, callback);
};

// Read
module.exports.getByEmail = (email, callback) => {
	let query = {email: email};
	Member.findOne(query, callback);
};

//Reset password by ID
module.exports.resetPasswordById = (id, password, callback) => {
	let query = {_id: id};
	let opt = {$set: {password: password}};
	Member.update(query, opt, callback);
};

// Update
module.exports.updateById = (id, groupId, callback) => {
	let query = {_id: id};
	let opt = {$push: {_groupId: groupId}};
	Member.update(query, opt, callback);
};

//Update
module.exports.updateByEmail = (email, firstName, lastName, dob, gender, mobileNumber, callback) => {
	let query = {email: email};
	let opt = {$set: {firstname: firstName, lastname: lastName, dob: dob, gender: gender, contactno: mobileNumber}};
	Member.findOneAndUpdate(query, opt, callback);
}

// Search Member
module.exports.searchgh = (model, callback) => {
	var query = {email: {$regex: model, $options: 'i'}};
	Member.find(query, callback);
};

// Get Group Members
module.exports.getGroupMembers = (_groupId, callback) => {
	var query = {_groupId: {$in: [_groupId]}};
	Member.find(query, callback);
};

// Delete
module.exports.deleteById = (id, groupId, callback) => {
	let query = {_id: id};
	let opt = {$pull: {_groupId: groupId}};
	Member.update(query, opt, callback);	
};

//Update
module.exports.updateByEmail = (email, firstName, lastName, dob, gender, mobileNumber, callback) => {
	let query = {email: email};
	let opt = {$set: {firstname: firstName, lastname: lastName, dob: dob, gender: gender, contactno: mobileNumber}};
	Member.findOneAndUpdate(query, opt, callback);
}

module.exports.makePayment = (obj, callback) => {
	var query = {_id: mongoose.Types.ObjectId(obj._Uid)};
	var update = {$set: {balance: obj.memberBalance}};
	Member.update(query, update, callback);
};