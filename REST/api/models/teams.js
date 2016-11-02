var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection  = require('./user');
autoIncrement.initialize(connection);

var teamSchema = new Schema({
	name: {type:String,required:true},
	admin: {type:String,required:true},
	team_code: {type:String, required: true},
    members : {type:Array, default:[]},
    phases:{type:Array,default:[]}
});
teamSchema.plugin(autoIncrement.plugin,{
	model : 'Team',
	startAt: 1
});

module.exports = mongoose.model('Team',teamSchema);
