var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');
var connection  = require('./user');
autoIncrement.initialize(connection);

var sprintSchema = new Schema({
    name: {type:String,required:true,unique:true},
    teamId: {type:Number,required:true}
});
sprintSchema.plugin(autoIncrement.plugin,{
    model : 'Sprint',
    startAt: 1
});

module.exports = mongoose.model('Sprint',sprintSchema);
