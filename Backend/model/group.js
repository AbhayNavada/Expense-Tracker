// jshint esversion : 6

var mongoose = require('mongoose');

var ModelSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId
	},
	_Uid: {
		type: mongoose.Schema.ObjectId,
		refs: 'member',
		unique: false
	},
	email: {
		type: String,
		refs: 'member'
	},
	memberCount: {
		type: Number,
		required: true
	},
	groupName: {
		type: String,
		required: true
	}
});

var Group = mongoose.model('group', ModelSchema);

module.exports = Group;

// Create
module.exports.add = (model, callback) => {
	model.save(callback);
};

// Read By id
module.exports.getById = (id, callback) => {
	Group.findById(id, callback);
};

// Search Group Head
module.exports.searchgh = (model, callback) => {
	var query = {'email': {$regex: model, $options: 'i'}};
	Group.find(query, callback);
};

// Update Group Head
module.exports.updategh = (id, email, groupId, callback) => {
	var query = {_id: groupId};
	var data = {_Uid: id, email: email};
	Group.update(query, data, callback); 
};

