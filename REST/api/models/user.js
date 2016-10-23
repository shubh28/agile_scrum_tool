var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = require('../../config/config');
var connection = mongoose.connect(config.database);
autoIncrement.initialize(connection);
module.exports = connection;
var userSchema = new Schema({
	name: {type:String,required:true},
	email: {type:String,required:true},
	password: {type:String, required: true}
});
userSchema.plugin(autoIncrement.plugin,{
	model : 'User',
	startAt: 1
});

module.exports = mongoose.model('User',userSchema);
