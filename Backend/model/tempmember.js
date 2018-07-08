// jshint esversion : 6

var mongoose = require('mongoose');

var ModelSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId
	},
	_Uid: {
		type: mongoose.Schema.ObjectId,
		unique: false,
		refs: 'member'
	},
	_groupId: {
		type: mongoose.Schema.ObjectId,
		unique: false,
		refs: 'group'		
	},
	groupName: {
		type: String,
		required: true
	}
});

var TempMember = mongoose.model('tempmember', ModelSchema);

module.exports = TempMember;

// Create
module.exports.add = (model, callback) => {
	model.save(callback);
};

// Read
module.exports.getbyId = (id, callback) => {
	var query= {_Uid: id};
	TempMember.find(query, callback);
};

// Read
module.exports.getAll = (id, callback) => {
	TempMember.find({_Uid: id}, callback);
};

// Delete
module.exports.deleteById = (id, callback) => {
	var query= {_id: id};
	TempMember.findByIdAndRemove(query, callback);
};