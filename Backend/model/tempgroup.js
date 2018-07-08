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
	groupName: {
		type: String,
		required: true
	}
});

var TempGroup = mongoose.model('tempgroup', ModelSchema);

module.exports = TempGroup;

// Create
module.exports.add = (model, callback) => {
	model.save(callback);
};

// Read
module.exports.getAll = (callback) => {
	TempGroup.find({}, callback);
};

// Delete
module.exports.deleteById = (id, callback) => {
	var query= {_id: id};
	TempGroup.findByIdAndRemove(query, callback);
};